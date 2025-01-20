---
title: Quality assessment
type: docs
toc: false
---


> [!CAUTION]
> 
> This page is a work in progress.

After initial contig extraction, many assemblers perform additional steps to improve contig quality:
a) Error Correction: Examine the extracted contigs for remaining sequencing errors, often using the consensus of multiple reads.
b) Contig Breaking: Identify potential misassemblies within contigs, often by looking for sudden drops in coverage or conflicting paired-end information.
c) Contig Extension: Attempt to extend contigs at their ends, possibly using lower-confidence graph traversals or additional sequencing data.
d) Contig Merging: Identify and merge contigs that likely overlap but weren't connected in the initial extraction due to graph complexities.

<!-- REFERENCES -->
