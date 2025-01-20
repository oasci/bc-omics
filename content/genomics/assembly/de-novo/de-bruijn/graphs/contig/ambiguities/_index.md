---
title: Ambiguities
type: docs
toc: false
---


> [!CAUTION]
> 
> This page is a work in progress.

Real genomic data often leads to complex graph structures due to repeats, errors, and coverage variations. Assemblers employ various strategies to resolve these ambiguities:
a) Coverage-Based Resolution: Differences in coverage can help distinguish between true genomic paths and error-induced branches. Higher coverage paths are generally preferred.
b) Paired-End Information: Many assemblers use paired-end read information to resolve ambiguities. If two regions are connected by multiple paired-end reads, it suggests they should be part of the same contig.
c) Bubble Removal: "Bubbles" in the graph (alternative paths between two nodes) often represent small variations or sequencing errors. Assemblers typically collapse these to a single path, often choosing the higher-coverage alternative.
d) Repeat Resolution: Long repeats create complex branching structures. Some assemblers attempt to resolve these using coverage patterns, paired-end information, or by breaking contigs at repeat boundaries.

<!-- REFERENCES -->
