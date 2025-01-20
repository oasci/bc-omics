---
title: Overlap-layout-consensus
type: docs
toc: false
---



The Overlap-Layout-Consensus (OLC) method is a fundamental technique used in genome assembly, which is essentially a three-step process.

1.  **Overlap**: The initial step involves identifying overlaps among all the reads.
    This is akin to finding common sections among different fragments of a puzzle.
2.  **Layout**: Once overlaps are established, the OLC algorithm arranges all the reads in a specific order that best represents their overlaps, forming a graph.
3.  **Consensus**: The final step involves deriving a consensus sequence from the multiple sequence alignments (MSA).
    This consensus sequence is a representation of the most likely arrangement of the reads.

It's important to note that the OLC approach is more suitable for low-coverage long reads, whereas other methods like Debruijn Graph (DBG) are more suitable for high-coverage short reads, especially for large genome assembly.
The choice of method depends on the specific requirements and constraints of the genome assembly project.

<!-- REFERENCES -->

[^kellisassembly]: [Libre texts](https://bio.libretexts.org/Bookshelves/Computational_Biology/Book%3A_Computational_Biology_-_Genomes_Networks_and_Evolution_%28Kellis_et_al.%29/05%3A_Genome_Assembly_and_Whole-Genome_Alignment/5.02%3A_Genome_Assembly_I-_Overlap-Layout-Consensus_Approach)
[^severin2023bioinformatics]: [Introduction to Genome Assembly - Bioinformatics Workbook](https://bioinformaticsworkbook.org/dataAnalysis/GenomeAssembly/Intro_GenomeAssembly.html)
[^wikiassembly]: [wikipedia.org/wiki/Sequence_assembly](https://en.wikipedia.org/wiki/Sequence_assembly)
[^jung2020twelve]: Jung, H., Ventura, T., Chung, J. S., Kim, W. J., Nam, B. H., Kong, H. J., ... & Eyun, S. I. (2020). Twelve quick steps for genome assembly and annotation in the classroom. *PLoS computational biology, 16*(11), e1008325. doi: [10.1371/journal.pcbi.1008325](https://doi.org/10.1371/journal.pcbi.1008325)
