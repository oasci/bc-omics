---
title: Contig extraction
type: docs
toc: false
---


> [!CAUTION]
> 
> This page is a work in progress.

Contig extraction is a crucial step in the genome assembly process, where the assembler aims to reconstruct longer, contiguous sequences (contigs) from the complex structure of the de Bruijn graph. This process involves identifying paths through the graph that likely represent true genomic sequences, while avoiding artifacts introduced by sequencing errors, repeats, and other complexities. In this section, we'll explore the general principles and techniques used by most de Bruijn graph assemblers for contig extraction.

## Basic Concepts

Before diving into the specifics of contig extraction, it's important to review some fundamental concepts:

-   **De Bruijn Graph:** A directed graph where nodes represent (k-1)-mers and edges represent k-mers. The graph structure captures the overlaps between adjacent k-mers in the sequencing reads.
-   **Contig:** A contiguous sequence assembled from overlapping reads, representing a portion of the genome without gaps.
-   **Path:** A sequence of connected nodes and edges in the graph.
-   **Coverage:** The number of reads supporting a particular k-mer or edge in the graph.
-   **Branching:** Points in the graph where a node has multiple incoming or outgoing edges, often representing repeats or errors.

<!-- REFERENCES -->
