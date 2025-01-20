---
title: DNA sequencing
type: docs
weight: 1
---


DNA sequencing is a laboratory technique that determines the order of nucleotides, or bases, in a DNA molecule.
The sequence of these bases&mdash;adenine (A), guanine (G), cytosine (C), or thymine (T)&mdash;encodes the biological information cells use to develop and operate.
Sequencing DNA is crucial to understanding the function of genes and other parts of the genome.

Several different methods are available for DNA sequencing, each with its own characteristics.
The most common methods include:

-   First generation: [Sanger](./first-gen/sanger/) and [Maxam-Gilbert](./first-gen/maxam-gilbert/);
-   Second generation: [Illumina](./second-gen/illumina/) and [ion torrent](./second-gen/ion-torrent/);
-   Third generation: [Nanopore](./third-gen/nanopore/) and single-molecule real-time.

The development of additional methods represents an active area of genomics research.
These methods are used in many areas of biology and other sciences, such as medicine, forensics, and anthropology.
DNA sequencing has become a key technology in molecular biology.
It allows researchers to identify changes in genes and noncoding DNA, associations with diseases and phenotypes, and potential drug targets.

## Challenges

Every genome sequencing, assembly, and annotation project is different due to each subject genome’s distinctive properties.
There are four fundamental aspects that must be considered when embarking on a new genome project: the genome size, levels of ploidy and heterozygosity, GC content, and complexity.
These will directly affect the overall quality and cost of genome sequencing, assembly, and annotation.

### How big is the genome?

The genome size will significantly influence the data that must be ordered and analyzed.
To assemble a genome, the first step is to secure a certain number/amount of sequences/depth/coverage (called reads) before proceeding with ordering sequence data.
To get an idea of a genome's size and complexity, publicly available databases for approximate genome sizes are accessible for [fungi](http://www.zbi.ee/fungal-genomesize), [animals](http://www.genomesize.com), and [plants](http://data.kew.org/cvalues).
If information on a target species is unavailable from a public database, selecting a closely related species is a practical option.

Alternatively, the two widely used flow cytometry and k-mer frequency distribution methods could provide reliable genome size estimates to predict repeat content and heterozygosity rates.
Flow cytometry is a fast, easy, and accurate system of simultaneous multiparametric analysis for nuclear DNA content, including a ploidy level that isolates nuclei stained with a fluorescent dye.
K-mer frequency distribution, a pseudo-normal/Poisson distribution around the mean coverage in the histogram of k-mer counts, is a powerful and straightforward approach to using raw Illumina DNA shotgun reads to infer genome size, data preprocessing for de Bruijn graph assembly methods (tune runtime parameters for analysis tools), repeat detection, sequencing coverage estimation, measuring sequencing error rates, and heterozygosity.
It is highly recommended to use flow cytometry and k-mer methods—the gold standard for genome size measures when designing genomic sequencing projects—because no single sequence-based method performs well for all species.
They all tend to underestimate genome sizes.

### Levels of ploidy and heterozygosity

Is it a diploid, polyploid, or highly heterozygous hybrid species?
It is better to use a single individual and sequence a haploid, highly inbred diploid organism, or isogenic line because this will minimize potential heterozygosity problems for genome assembly.
While most genome assemblers are haploid mode (some diploid-aware mode) to collapse allelic differences into one consensus sequence, using complex polyploid or less inbred diploid genomes can significantly increase the number of present alleles, which will likely result in a more fragmented assembly or create uncertainties about the contigs’ homology.
If so, polyploid and highly repetitive genomes may require 50% to 100% more sequence data than their diploid counterparts.

### GC content

Is there high/low GC content in a genomic region?
Extremely low or high GC content in a genomic region is mainly known to cause problems for second-generation sequencing (SGS) technologies (also called short-read sequencing, which refers primarily to Illumina sequencing), resulting in low or no coverage in those regions.
While this can be compensated for by increasing the coverage, we recommend using third-generation sequencing (TGS) technologies (PacBio and ONT) that do not exhibit this bias.

### Complexity

How many repetitive sequences (or transposable elements) will likely be present in the genome?
The amount and distribution of repetitive sequences, potentially occurring at different locations in the genome, can hugely influence genome assembly results simply because reads from these different repeats are very similar.
The assemblers’ algorithms cannot distinguish them effectively.
This may eventually lead to misassembly and misannotation.
This is particularly true for SGS reads and assemblies, and a high repeat content will often lead to a fragmented assembly because the assemblers cannot effectively determine the correct assembly of these regions and stop extending the contigs at the border of the repeats.
To resolve the assembly of repeats (or if the subject genome has a high repeat content), using TGS reads that are sufficiently long to include the unique sequences flanking the repeats is an effective strategy.
Thus, understanding the target genome and generating sufficient sequence data/read coverage is a crucial starting point in a genome assembly and annotation project.

## Acknowledgements

Adapted with permission from the following materials:

-   [genome.gov](https://www.genome.gov/)

<!-- REFERENCES -->

[^ismali2022bioinformatics]: Ismail, H. D. (2022). Bioinformatics: a practical guide to NCBI databases and sequence alignments. Chapman and Hall/CRC.
[^giani2020long]: Giani, A. M., Gallo, G. R., Gianfranceschi, L., & Formenti, G. (2020). Long walk to genomics: History and current approaches to genome sequencing and assembly. *Computational and Structural Biotechnology Journal*, 18, 9-19. doi: [10.1016/j.csbj.2019.11.002](https://doi.org/10.1016/j.csbj.2019.11.002)
[^jung2020twelve]: Jung, H., Ventura, T., Chung, J. S., Kim, W. J., Nam, B. H., Kong, H. J., ... & Eyun, S. I. (2020). Twelve quick steps for genome assembly and annotation in the classroom. *PLoS computational biology, 16*(11), e1008325. doi: [10.1371/journal.pcbi.1008325](https://doi.org/10.1371/journal.pcbi.1008325)
