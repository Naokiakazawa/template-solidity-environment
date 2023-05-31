#!/usr/bin/env node

import { Dirent, readdirSync } from "fs";
import path from "path";
import graphlib from "graphlib";
import type { ContractDefinition } from "solidity-ast";
import { findAll } from "solidity-ast/utils";
const folder = "artifacts/build-info/";

interface SolcOutput {
  contracts: Record<string, unknown>;
  sources: Record<string, { ast: ContractDefinition }>;
}

function getArtifacts(dirPath: string): string[] {
  let files: string[] = [];
  files = readdirSync(dirPath, { withFileTypes: true })
    .filter((dirent: Dirent): boolean => dirent.isFile())
    .map((dirent: Dirent): string => dirent.name);
  return files;
}

const artifacts: string[] = getArtifacts(folder);

for (const artifact of artifacts) {
  // eslint-disable-next-line
  const { output: solcOutput }: { output: SolcOutput } = require(path.resolve(
    __dirname,
    "../..",
    "artifacts/build-info",
    artifact,
  ));

  const graph: graphlib.Graph = new graphlib.Graph({ directed: true });
  const names: any = {};
  const linearized: number[][] = [];

  for (const source in solcOutput.contracts) {
    if (source.includes("/mocks/")) {
      continue;
    }

    for (const contractDef of findAll("ContractDefinition", solcOutput.sources[source].ast)) {
      names[contractDef.id] = contractDef.name;
      linearized.push(contractDef.linearizedBaseContracts);

      contractDef.linearizedBaseContracts.forEach((c1: number, i: number, contracts: number[]) =>
        contracts.slice(i + 1).forEach((c2: number) => {
          graph.setEdge(c1.toString(), c2.toString());
        }),
      );
    }
  }

  graph.nodes().forEach((x: string, i: number, nodes: string[]) =>
    nodes
      .slice(i + 1)
      .filter((y: string): boolean => graph.hasEdge(x, y) && graph.hasEdge(y, x))
      .forEach((y: string) => {
        console.log(
          `Conflict between ${names[x]} and ${names[y]} detected in the following dependency chains:`,
        );
        linearized.filter((chain: number[]) => {
          const comp: ">" | "<" =
            chain.indexOf(parseInt(x)) < chain.indexOf(parseInt(y)) ? ">" : "<";
          console.log(`- ${names[x]} ${comp} ${names[y]}`);
          //console.log(`- ${names[x]} ${comp} ${names[y]} in ${names[chain.find(Boolean)]}`);
        });
        process.exitCode = 1;
      }),
  );
}

if (!process.exitCode) {
  console.log("Contract ordering is consistent.");
}
