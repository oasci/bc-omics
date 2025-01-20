---
title: Controlled DNA synthesis
type: docs
---


The development of Sanger sequencing was grounded in a deep understanding of DNA structure and replication mechanisms.
Frederick Sanger and his colleagues at the University of Cambridge approached the challenge of determining DNA sequences by considering how the natural process of DNA replication could be manipulated and observed.

## Reading DNA's Code

At the core of Sanger's work was a fundamental question: How can we determine the exact sequence of nucleotides in a DNA molecule?
This was not a trivial problem, as DNA molecules can be extremely long and are composed of just four types of nucleotides (A, T, G, C) repeated in a specific order.
To address this challenge, Sanger and his colleagues drew upon several key principles and concepts related to DNA structure and replication.

Understanding how DNA naturally replicates was crucial to Sanger's approach.
DNA polymerase enzymes read a template strand and create a complementary strand by adding nucleotides one by one.
This process is highly accurate and processive, meaning it can continue for long stretches of DNA without dissociating from the template.
The specific pairing of nucleotides (A with T, G with C) ensures the accuracy of replication and provides a mechanism for "reading" one strand by creating its complement.
This complementarity is fundamental to both natural DNA replication and Sanger sequencing.

Several challenges need to be overcome to develop a reliable sequencing method.
Genomic DNA can be millions of base pairs long, making developing a method to read such long sequences a significant challenge.
Additionally, the four DNA nucleotides are very similar in structure and chemical properties, making it difficult to distinguish between them directly.
The speed and processivity of DNA polymerase in natural systems also posed a challenge, as replication occurs too quickly and continuously to allow for easy observation of each nucleotide addition.
Furthermore, in natural systems, DNA replication continues until the end of the template is reached or specific termination signals are encountered.

## Terminating DNA replication

Sanger hypothesized that if DNA replication could be selectively terminated at specific points, the resulting fragments would reveal the sequence of the template DNA.
Here's how this idea works in practice:

1.  **Template Preparation**: Start with a single-stranded DNA template whose sequence you want to determine.
2.  **Primer Attachment**: Attach a short, known DNA sequence (primer) to the template.
    This provides a starting point for DNA synthesis.
3.  **Controlled Synthesis**: Allow DNA polymerase to begin synthesizing the complementary strand, but include in the reaction a small amount of modified nucleotides that, when incorporated, stop further synthesis.
4.  **Fragment Generation**: As synthesis proceeds, these modified nucleotides are occasionally incorporated instead of the normal nucleotides, causing the synthesis to stop at different points along the template.
5.  **Fragment Analysis**: By separating these fragments by size and determining which modified nucleotide caused each termination, you can deduce the sequence of the original template.

You can see a brief animation of this controlled synthesis idea below.

> This model simplifies the complex process of DNA replication, omitting enzymes like DNA polymerase and other cellular factors. It aims to visualize the basic concept of complementary base pairing and the directionality of DNA synthesis.
> <div id="chain-termination-container"></div>
> <script src="/p5/chain-term/chain-termination.js"></script>
> 
> [Full screen](/p5/chain-term/chain-termination.html)

The key to this method is the generation of a set of DNA fragments that differ in length by single nucleotides.
Each fragment length corresponds to the position of a specific nucleotide in the sequence.
By determining the length of each fragment and which nucleotide it ends with, you can reconstruct the sequence of the original DNA template.
This approach transformed the problem of reading a long, complex DNA molecule into a more manageable task of analyzing a collection of shorter DNA fragments.

## Nucleotide detection

At the time of his groundbreaking work, the tools available for molecular detection were limited, with radioactivity being the primary means of tracking biological molecules.
Sanger leveraged this technology by incorporating radioactively labeled, terminating nucleotides, often referred to as "hot" nucleotides, into his sequencing reactions.
However, the limitation of this approach was that radioactive labeling could not distinguish between different nucleotides; it could only indicate the presence of a labeled molecule.

To overcome this challenge, Sanger designed a protocol that required four separate reactions, one for each nucleotide (A, T, G, and C).
In each reaction, only one type of terminating nucleotide was radioactively labeled.
This clever workaround allowed researchers to determine which nucleotide was present at each position in the sequence by comparing the results from all four reactions.
While effective, this method was labor-intensive and time-consuming, requiring multiple reactions and careful analysis to piece together the complete DNA sequence.

Modern Sanger sequencing techniques have moved away from radioactive labeling in favor of fluorescence-based detection.
This shift has dramatically simplified and accelerated the sequencing process.
Instead of using radioactive nucleotides and running four separate reactions, contemporary methods employ fluorescently labeled dideoxynucleotides that emit light at different wavelengths.
Each of the four nucleotides is tagged with a distinct fluorescent dye, allowing them to be distinguished from one another in a single reaction.

This advancement has not only increased the efficiency of Sanger sequencing but has also paved the way for its automation, significantly boosting the speed and scale at which DNA sequences can be determined.

## Fragment separation

The separation of DNA fragments is a crucial step in Sanger sequencing, as it allows for the determination of fragment lengths and, consequently, the DNA sequence.
This process has undergone significant changes since the method's inception, reflecting advancements in technology and the push for higher throughput and automation.

In the original Sanger sequencing method, DNA fragment separation was achieved through a labor-intensive process called slab gel electrophoresis.
This technique involved pouring a polyacrylamide gel between two glass plates, creating a thin, flat gel "slab."
The DNA samples from the four separate sequencing reactions (one for each nucleotide) were loaded into wells at one end of the gel.
An electric field was then applied, causing the negatively charged DNA fragments to migrate through the gel towards the positive electrode.
Smaller fragments moved more quickly through the gel matrix, while larger fragments were more impeded, resulting in separation based on size.

> This image shows a classic DNA sequencing gel obtained through Sanger sequencing and visualized by autoradiography.
> 
> ![](https://upload.wikimedia.org/wikipedia/commons/c/cb/Sequencing.jpg){ height=600 }
> 
> The gel contains four lanes, labeled A, T, G, and C, corresponding to the four DNA nucleotides. Each lane represents a separate sequencing reaction containing DNA fragments that terminate with the respective nucleotide.
> To read the sequence:
> 
> 1.   Start at the bottom of the gel, where the shortest fragments are located.
> 2.   Move upwards, reading the sequence by identifying which lane (A, T, G, or C) contains a band at each position.
> 3.   The sequence is read from bottom to top, corresponding to the 5' to 3' direction of the DNA strand.
> 
> For example, if the bottom-most band is in the T lane, followed by bands in the A, C, and G lanes moving upwards, the beginning of the sequence would be TACG.
> This method allows researchers to determine the precise order of nucleotides in a DNA molecule.

The early gels were typically quite large, often 40-60 cm in length, to provide sufficient resolution for separating fragments that differed by just one nucleotide.
After electrophoresis, which could take several hours, the gel would be dried and exposed to X-ray film to visualize the radioactively labeled DNA bands.
Researchers would then manually read the sequence from the resulting autoradiograph, a time-consuming and error-prone process.
Despite these challenges, this method was groundbreaking, allowing scientists to read sequences of up to several hundred base pairs in a single run.

As Sanger sequencing evolved, significant improvements were made to the fragment separation process.
The introduction of automated sequencers in the late 1980s and early 1990s marked a turning point.
These machines utilized capillary electrophoresis, a technique that replaced the large slab gels with narrow glass capillaries filled with a polymer solution.
This shift brought several advantages:

1.  **Increased speed**: Capillary electrophoresis could be performed much more quickly than slab gel electrophoresis, reducing run times from hours to minutes.
2.  **Improved resolution**: The narrow capillaries allowed for better heat dissipation, enabling the use of higher voltages and resulting in sharper band separation.
3.  **Automation**: Capillary systems could be easily automated, allowing for continuous operation and higher throughput.
4.  **Real-time detection**: By incorporating laser-induced fluorescence detection, these systems could detect and record the fluorescent signal from each DNA fragment as it passed a detection window, eliminating the need for post-electrophoresis processing.

!!! quote "Figure"
    <figure markdown>
    ![](https://ars.els-cdn.com/content/image/3-s2.0-B9780128030776000059-f05-05-9780128030776.jpg)
    </figure>

Modern Sanger sequencing machines typically use arrays of 8, 16, or even 96 capillaries running in parallel, dramatically increasing the number of samples that can be processed simultaneously.
The polymer solutions used in these capillaries have also been optimized for better separation and faster run times.

[^sanger1977dna]: Sanger, F., Nicklen, S., & Coulson, A. R. (1977). DNA sequencing with chain-terminating inhibitors. *Proceedings of the national academy of sciences, 74*(12), 5463-5467. doi: [10.1073/pnas.74.12.5463](https://doi.org/10.1073/pnas.74.12.5463)
[^shendure2008next]: Shendure, J., & Ji, H. (2008). Next-generation DNA sequencing. *Nature biotechnology, 26*(10), 1135-1145. doi: [10.1038/nbt1486](https://doi.org/10.1038/nbt1486)

[^shuhaib2023mastering]: Al-Shuhaib, M. B. S., & Hashim, H. O. (2023). Mastering DNA chromatogram analysis in Sanger sequencing for reliable clinical analysis. *J. Genet. Eng. Biotechnol., 21*(1), 115. doi: [10.1186/s43141-023-00587-6](https://doi.org/10.1186/s43141-023-00587-6)
[^lopez2021sanger]: Arteche-López, A., Ávila-Fernández, A., Romero, R., Riveiro-Álvarez, R., López-Martínez, M. A., Giménez-Pardo, A., ... & Ayuso, C. (2021). Sanger sequencing is no longer always necessary based on a single-center validation of 1109 NGS variants in 825 clinical exomes. *Scientific reports, 11*(1), 5697. doi: [10.1038/s41598-021-85182-w](https://doi.org/10.1038/s41598-021-85182-w)
[^cario2020sanger]: De Cario, R., Kura, A., Suraci, S., Magi, A., Volta, A., Marcucci, R., ... & Sticchi, E. (2020). Sanger validation of high-throughput sequencing in genetic diagnosis: Still the best practice?. *Frontiers in genetics, 11*, 592588. doi: [10.3389/fgene.2020.592588](https://doi.org/10.3389/fgene.2020.592588)
[^giani2020long]: Giani, A. M., Gallo, G. R., Gianfranceschi, L., & Formenti, G. (2020). Long walk to genomics: History and current approaches to genome sequencing and assembly. *Computational and Structural Biotechnology Journal*, 18, 9-19. doi: [10.1016/j.csbj.2019.11.002](https://doi.org/10.1016/j.csbj.2019.11.002)
[^crossley2020guidelines]: Crossley, B. M., Bai, J., Glaser, A., Maes, R., Porter, E., Killian, M. L., ... & Toohey-Kurth, K. (2020). Guidelines for Sanger sequencing and molecular assay monitoring. *Journal of Veterinary Diagnostic Investigation, 32*(6), 767-775. doi: [10.1177/1040638720905833](https://doi.org/110.1177/1040638720905833)
