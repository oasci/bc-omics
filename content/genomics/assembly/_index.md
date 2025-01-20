---
title: Gene assembly
type: docs
toc: false
weight: 1
---


In bioinformatics, genome assembly represents the process of combining many short DNA sequences to recreate the original chromosomes from which the DNA originated.
Sequence assembly is one of the basic steps after performing DNA sequencing.
The established genome assembly can be submitted to databases such as the [European Nucleotide Archive](https://www.ebi.ac.uk/ena/browser/), [NCBI Genome](https://www.ncbi.nlm.nih.gov/datasets/genome/), and [Ensembl Genomes](https://www.ensembl.org/).
You can also browse these databases for genomic sequences done by other researchers.

> ![](https://sandbox.dodona.be/en/activities/1535795563/description/6Vg7bgJkMY2_iKxn/media/fragment-assembly.png)
> 
> Credit: [Dodona](https://dodona.be/en/exercises/1535795563/#)

There are two different types of genome assembly: [de novo](./de-novo/) assembly and mapping to a [reference](./reference/) genome.
[De novo](./de-novo/) assembly refers to the genome assembly of a novel genome from scratch without reference to genomic data.
A reference genome or a [reference assembly](./reference/) is a digital nucleic acid sequence database that represents a species’ set of genes.
Once the reference genome is available, with its aid, the genome assembly becomes much easier, quicker, and even more accurate.
Therefore, unless necessary, researchers choose the method of [reference-based alignment](./reference/).
Reference-based alignment has become the current standard in diagnostics.

A high-quality and well-annotated genome assembly is increasingly becoming an essential tool for applied and basic research across many biological disciplines in the 21st century that can turn any organism into a model organism.
Thus, securing complete and accurate reference genomes and annotations before analyzing post-genome studies such as genome-wide association studies, structural variations, and posttranslational studies (methylation or histone modification) has become a cornerstone of modern genomics.
However, early works have warned against its applications in genome assembly because the resultant assemblies may contain biases toward errors and chromosomal rearrangements in the existing reference genome.

<!-- REFERENCES -->

[^jung2020twelve]: Jung, H., Ventura, T., Chung, J. S., Kim, W. J., Nam, B. H., Kong, H. J., ... & Eyun, S. I. (2020). Twelve quick steps for genome assembly and annotation in the classroom. *PLoS computational biology, 16*(11), e1008325. doi: [10.1371/journal.pcbi.1008325](https://doi.org/10.1371/journal.pcbi.1008325)
[^ee372]: [EE 372: Data Science for High-Throughput Sequencing](https://data-science-sequencing.github.io/)
