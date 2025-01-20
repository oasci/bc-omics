---
title: Illumina
type: docs
---


Illumina, arguably the most popular sequencing method, is based on the concept of "sequencing by synthesis".
Sequencing by synthesis technology uses a polymerase or ligase enzyme to incorporate nucleotides with a fluorescent tag, which are then identified to determine the DNA sequence.

<iframe width="100%" height="473" src="https://www.youtube.com/embed/fCd6B5HRaZ8?si=0SQa8z6SLd9mIhjh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Genomic library

### DNA fragmentation

The initial phase in NGS library preparation for Illumina systems involves breaking down DNA into the desired size range, typically 300–600 bp, depending on the intended application.
Traditionally, two methods are used for DNA fragmentation: mechanical shearing and enzymatic digestion.

#### Mechanical shearing

Mechanical shearing is more prevalent among these two methods due to its unbiased fragmentation and ability to consistently yield fragment sizes.
In contrast, enzymatic digestion necessitates lower DNA input and provides a more streamlined library preparation workflow.
Mechanical shearing involves the disruption of phosphodiester linkages in DNA molecules by applying shear force.
Standard methods include high-power, unfocused sonication, nebulization, and focused high-frequency acoustic shearing.

**Sonication** is the simplest method.
It employs a sonicator (probe- or waterbath-based) to emit low-frequency acoustic waves for shearing.
While probe-based sonication delivers more focused energy, the samples are exposed in an open container, posing a contamination risk. Waterbath-based sonication keeps samples within a closed system but often requires higher energy.
Optimization is crucial to achieving desired fragment lengths, and resting periods are necessary between sonication cycles to prevent overheating, leading to a longer workflow.

**Nebulization** involves using compressed gas to create shear force, forcing a nucleic acid solution through a small hole in a nebulizer.
The level of fragmentation can be controlled by gas pressure but may result in high sample loss.

The **focused acoustic** method employs high-frequency ultrasonic waves to shear DNA with minimal sample loss, low contamination risk, and better control over uniform fragmentation.
However, its usage is limited due to the need for specialized equipment and associated costs.

#### Enzymatic digestion

**Enzymatic digestion** is an effective alternative to mechanical shearing. It employs endonucleases and nicking enzymes to cleave DNA strands.
Enzymes with less specificity or enzyme cocktails are used to mitigate sequence bias. Enzymatic digestion requires lower DNA input and enables automation, streamlining the workflow, minimizing sample loss, reducing contamination risks, and decreasing hands-on time.

**Transposon-based fragmentation** offers an alternative to mechanical shearing and enzymatic digestion.
This approach, using transposons, simultaneously fragments and tags DNA templates, generating blunt DNA fragments with transposed sequences at both ends.
Adapters (and indexes) are added via adapter-addition PCR, circumventing traditional workflow steps like DNA fragmentation, end conversion, and adapter ligation.

### End repair

Following the initial fragmentation, DNA samples undergo a repair process known as end repair.
DNA fragments generated through mechanical shearing or enzymatic digestion exhibit a combination of 5′ and 3′ protruding ends that necessitate repair or conversion for subsequent ligation with adapters.
The critical steps involved in this process include making the termini blunt, phosphorylating them, and adenylating them.

To accomplish this:

-   5′ overhangs are filled in using the 5′→3′ polymerase activity of enzymes like T4 DNA polymerase or Klenow fragment.
-   3′ overhangs are eliminated by the 3′→5′ exonuclease activity of enzymes such as T4 DNA polymerase.
-   The 5′ ends of the blunted DNA fragments are phosphorylated for efficient ligation in subsequent steps, employing enzymes like T4 polynucleotide kinase.
-   The 3′ ends of the blunted DNA fragments undergo adenylation (A tailing), a requirement for T–A ligation with Illumina adapters. Enzymes such as Klenow fragment (exo–) or Taq DNA polymerase facilitate this step.

> ![](https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/next-generation-sequencing/dna-sequencing-preparation-illumina/jcr:content/MainParsys/textimage_6889/image.img.320.medium.jpg/1693927921286.jpg)
> 
> Credit: [ThermoFisher](https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/next-generation-sequencing/dna-sequencing-preparation-illumina.html)

While the end conversion process involves several enzymatic steps, some commercially available kits are designed to streamline these reactions in a single tube, saving time and minimizing sample loss.

### Adapter ligation

Adapters are a pair of heat-treated short DNA sequences that aid in the amplification and sequencing processes.
Twin sets of annealed adapters are attached to both ends of the genetic material library fragments.
This allows the oligos on the flow cell to be identified during sequencing. In the library preparation phase, an excess of adapters relative to the sample DNA drives the ligation reaction to completion.
Efficient ligation is crucial for transforming DNA fragments into sequences, influencing the conversion rate and yield of the libraries.
These library fragments, enclosed by adapters, are sometimes called inserts.

During the formation of adapter duplexes, two oligos, P5 and P7, are annealed.
The P5 and P7 adapters derive their names from their binding sites on the flow cell oligos.
Adapters have noncomplementary ends to prevent self-ligation, forming a Y shape after annealing.
However, this Y shape is lost if library amplification follows.

> ![](https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/next-generation-sequencing/dna-sequencing-preparation-illumina/jcr:content/MainParsys/textimage_6e54/image.img.320.medium.jpg/1693927921338.jpg)
> 
> Credit: [ThermoFisher](https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/next-generation-sequencing/dna-sequencing-preparation-illumina.html)

Examining the library adapters in more detail, they typically consist of 50&ndash;60 nucleotides and encompass features such as:

-   Sites binding to P5 or P7 oligos on the flow cells and sequencing primers.
-   Index sequences, usually 6–8 nucleotides, distinguishing one sample from another, enabling multiplexing.
-   Additional T at the 3′ end of the P5 adapter to prevent adapter dimer formation.
-   Phosphate at the 5′ end of the P7 adapter for ligation with the 3′ end of library fragments.

> ![](https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/next-generation-sequencing/dna-sequencing-preparation-illumina/jcr:content/MainParsys/textimage_2b88/image.img.320.medium.jpg/1693927921369.jpg)
> 
> Credit: [ThermoFisher](https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/next-generation-sequencing/dna-sequencing-preparation-illumina.html)

The issue of index hopping, which occurs when sequencing multiple libraries together, is addressed through two main strategies:

-   Using unique dual indexes (UDIs) instead of combinatorial dual indexes (CDIs) ensures that index sequences are assigned uniquely to each library in the pool before sequencing.
-   Reducing the number of unligated adapters in the samples minimizes index hopping, with PCR-free libraries being more susceptible due to fewer cleanup steps usually performed.

> ![](https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/next-generation-sequencing/dna-sequencing-preparation-illumina/jcr:content/MainParsys/textimage_d5c7/image.img.320.medium.jpg/1693927921436.jpg)
> 
> Credit: [ThermoFisher](https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/next-generation-sequencing/dna-sequencing-preparation-illumina.html)

These strategies help mitigate the challenges posed by index hopping during sequencing, particularly in the context of data analysis and the accurate assignment of sequencing data to respective samples.

### Amplification

Methods for preparing DNA libraries can be classified as either PCR-free or PCR-based, depending on the necessity for amplification.
Adhering to protocols that result in diverse and representative libraries of input samples across various quantities is crucial to ensuring the production of high-quality data.

#### PCR-free

PCR-free library preparation is typically preferred when creating libraries that cover sequences with high GC or AT content, as PCR amplification may contribute to GC bias.
This approach helps ensure library diversity.
It's important to note that bias can still be introduced during cluster generation and sequencing chemistry, even with PCR-free library preparation methods.

Compared to PCR-based methods, PCR-free libraries generally require more starting material.
However, there have been advancements in reducing these requirements.
This can be challenging in situations involving limited or precious samples and highly degraded nucleic acids.
PCR-free libraries may be more challenging to assess library quality and quantity accurately than PCR-amplified libraries.

However, the improved representation and balanced coverage provided by PCR-free libraries make them appealing for various applications, including:

-   Studies involving population-scale genomics and the molecular basis of diseases.
-   Investigations of promoters and regulatory regions in the genome often have high GC or AT content.
-   Whole-genome sequencing analysis and variant calling for single-nucleotide polymorphisms (SNPs) and small insertions or deletions (indels).

#### PCR-based

The PCR-based approach is typical for constructing Next-Generation Sequencing (NGS) libraries due to its ability to accommodate lower sample input and selectively amplify inserts with adapters at both ends.
However, PCR may introduce bias towards GC content, presenting challenges in subsequent data analysis.
For instance, GC bias can impede de novo genome assembly and the discovery of single-nucleotide polymorphisms (SNPs).

Several factors contribute to GC bias, and it is crucial to consider the following elements to achieve a well-balanced library coverage:

-   The choice of PCR enzyme and master mix.
-   The number of PCR cycles performed, along with cycling conditions.
-   The presence of PCR additives or enhancers in the reaction.

An elevation in the number of PCR cycles when using a specific PCR enzyme or master mix typically results in increased GC bias.
As a general guideline, run the minimum number of cycles (e.g., 4–8) that yield sufficient library quantities for sequencing.

Reducing the number of PCR cycles mitigates GC bias, diminishes PCR duplicates, and enhances library complexity.
PCR duplicates refer to sequencing reads originating from two or more PCR amplicons of the same DNA molecule.
Although bioinformatics tools exist to detect and eliminate PCR duplicates during data analysis, minimizing their occurrence is essential for efficiently utilizing the flow cell in sequencing.

Additionally, other PCR artifacts, such as amplification bias (attributed to PCR stochasticity), nucleotide errors (resulting from enzyme fidelity), and PCR chimeras (stemming from the enzyme's template switching), can compromise library quality and complexity.

## Flow cell loading

The flow cell loading step is a critical preparatory process in Illumina sequencing that attaches DNA or RNA fragments to the sequencing flow cell surface and amplifies them into clusters ready for sequencing.

First, the glass flow cell surface is chemically treated with lanes of tiny wells, each containing oligos complementary to platform-specific adapter sequences that will be added to the fragment ends.
The fragments to be sequenced, whether genomic DNA or cDNA from an RNA preparation, are diluted to an optimal concentration and hydraulically loaded into the flow cell lanes along with necessary sequencing reagents.
The adapter-modified fragments then hybridize and bind to their complementary oligos on the flow cell surface.

## Clonal amplification

The Illumina platform employs solid-phase amplification, wherein each DNA fragment in the library initially binds to primers on the sequencing chip, also known as the flow cell, through adapters.
Through a series of amplification reactions called bridge amplification, each fragment forms a cluster of identical molecules known as clonal clusters.
Each cluster corresponds to a single primary library molecule.
It is important to note that when clonal amplification is performed on a patterned flow cell with predefined arrays, an exclusion amplification (ExAmp) chemistry is employed.
ExAmp technology involves the immediate amplification of a DNA fragment after binding to the primer on the patterned flow cell, preventing other DNA fragments from forming a polyclonal cluster.

> ![](https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/next-generation-sequencing/illumina-workflow/jcr:content/MainParsys/textimage_1d51/image.img.320.low.jpg/1693405678648.jpg)
> 
> Credit: [ThermoFisher](https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/next-generation-sequencing/illumina-workflow.html)

It is essential to distinguish this clonal amplification process from library amplification, which aims to increase the library input before loading it onto a flow cell.

## Sequencing by synthesis

Following clonal amplification, the subsequent step is sequencing by synthesis (SBS).
This method detects nucleotides incorporated by a DNA polymerase into the complementary DNA strand of clonal clusters on a base-by-base basis.

The sequencing technology by Illumina employs fluorescent dye–labeled dNTPs featuring a reversible terminator to capture fluorescent signals in each cycle, utilizing a process known as cyclic reversible termination.
In each cycle, the DNA polymerase incorporates only one of the four fluorescent dNTPs based on complementarity, and then unbound dNTPs are removed.
Images of the clusters are taken after the incorporation of each nucleotide, and the emission wavelength and fluorescence intensity of the incorporated nucleotide are analyzed to identify the base incorporated in each cluster during that cycle.
Following imaging, the fluorescent dye and terminator are cleaved and released, followed by the subsequent synthesis cycle, imaging, and deprotection cycle.
As each base is sequenced individually in each cycle, this process is iterated for "n" cycles to achieve a read length of "n" bases.

> ![](https://atdbio.com/assets/book/reversible-terminator-sequencing.svg){ alight=left width=700 }
> 
> Credit: [atdbio](https://atdbio.com/nucleic-acids-book/Next-generation-sequencing#Reversible-terminator-sequencing-Illumina)

> ![](https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/next-generation-sequencing/illumina-workflow/jcr:content/MainParsys/textimage_544/image.img.320.low.jpg/1693405678683.jpg){ alight=left width=700 }
> 
> Credit: [ThermoFisher](https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/next-generation-sequencing/illumina-workflow.html)

<!-- REFERENCES -->

[^pereira2020bioinformatics]: Pereira, R., Oliveira, J., & Sousa, M. (2020). Bioinformatics and computational tools for next-generation sequencing analysis in clinical genetics. *Journal of clinical medicine, 9*(1), 132. doi: [10.3390/jcm9010132](https://doi.org/10.3390/jcm9010132)
[^hess2020library]: Hess, J. F., Kohl, T. A., Kotrová, M., Rönsch, K., Paprotka, T., Mohr, V., ... & Paust, N. (2020). Library preparation for next generation sequencing: A review of automation strategies. *Biotechnology advances, 41*, 107537. doi: [10.1016/j.biotechadv.2020.107537](https://doi.org/10.1016/j.biotechadv.2020.107537)
[^thermofisher]: [ThermoFisher](https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/next-generation-sequencing/dna-sequencing-preparation-illumina.html)
