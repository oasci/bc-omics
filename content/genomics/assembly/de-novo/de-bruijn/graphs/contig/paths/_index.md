---
title: Simple paths
type: docs
toc: false
---



> [!CAUTION]
> 
> This page is a work in progress.

The first step in contig extraction is typically to identify simple, unbranched paths in the de Bruijn graph. These paths represent straightforward sections of the genome where there is no ambiguity in the assembly.

-   Linear Paths: Sequences of nodes where each internal node has exactly one incoming and one outgoing edge. These are the easiest to extract and often form the backbone of many contigs.
-   Guaranteed Contigs: In some cases, linear paths with high, consistent coverage can be immediately extracted as contigs, as they likely represent unique genomic regions.
-   Path Compression: Many assemblers perform path compression, where linear paths are collapsed into single nodes, simplifying the graph structure and reducing computational complexity for subsequent steps.

<!-- REFERENCES -->
