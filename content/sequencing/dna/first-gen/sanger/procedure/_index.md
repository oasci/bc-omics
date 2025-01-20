---
title: Procedure overview
type: docs
---


## Dideoxynucleotides

The use of dideoxynucleotides (ddNTPs) as chain terminators was a critical insight in the development of the method.
This lack of hydroxyl group prevents ddNTPs from making a phosphodiester bond with the next nucleotide, thus terminating the nucleotide chain.

> ![](https://www.onlinebiologynotes.com/wp-content/uploads/2017/07/ddNTPs-1.jpg)
> 

Respective ddNTPs of dNTPs terminate the chain at their respective site.
For example, ddATP terminates at the A site, ddCTP at the C site, ddGTP at the G site, and ddTTP at the T site.

## PCR

The sequencing begins by dividing the DNA sample into four separate reactions, each containing all four standard deoxynucleotides (dATP, dGTP, dCTP, and dTTP) and the DNA polymerase enzyme.
In these reactions, only one type of dideoxynucleotide (ddATP, ddGTP, ddCTP, or ddTTP) is added to each reaction alongside the regular deoxynucleotides.

As the DNA polymerase extends the DNA chain during each sequencing reaction, termination occurs at different positions depending on which dideoxynucleotide is present.
This results in the production of a series of DNA fragments of varying lengths in each reaction.

The termination at specific bases generates a unique pattern of fragments in each reaction.
These fragments represent the particular nucleotide positions in the original DNA sequence.
Using different dideoxynucleotides in separate reactions allows the researcher to obtain information about the sequence at each position along the DNA template.

> ![](https://www.sigmaaldrich.com/deepweb/assets/sigmaaldrich/marketing/global/images/technical-documents/protocols/genomics/sequencing/sanger-sequencing_steps_process_diagram/sanger-sequencing_steps_process_diagram.png)
> 
> Credit: [Millipore Sigma](https://www.sigmaaldrich.com/US/en/technical-documents/protocol/genomics/sequencing/sanger-sequencing)

## Fluorescence

The addition of fluorescent tags to dideoxynucleotides (ddNTPs) facilitates the detection and determination of DNA sequences.
Each ddNTP (ddATP, ddGTP, ddCTP, or ddTTP) is labeled with a distinct fluorescent tag.

> ![](https://upload.wikimedia.org/wikipedia/commons/0/09/%D0%A4%D0%BB%D1%83%D0%BE%D1%80%D0%B5%D1%81%D1%86%D0%B5%D0%BD%D1%82%D0%BD%D1%8B%D0%B5_%D0%B4%D0%B8%D0%B4%D0%B5%D0%B7%D0%BE%D0%BA%D1%81%D0%B8%D1%82%D0%B5%D1%80%D0%BC%D0%B8%D0%BD%D0%B0%D1%82%D0%BE%D1%80%D1%8B_%D0%A1%D0%B0%D0%BD%D0%B3%D0%B5%D1%80.svg){ alight=left width=600 }
> 

This labeling allows the simultaneous sequencing of DNA fragments from four separate reactions.
After the DNA fragments are generated and separated by size through gel electrophoresis, adding fluorescent tags enables researchers to visualize and distinguish the terminated fragments based on their specific ddNTP.
Automated sequencing machines can detect the color-coded fragments, providing a faster and more accurate means of determining the DNA sequence.
This fluorescence-based approach enhances sensitivity and precision and reduces ambiguity in reading sequences.
The use of fluorescently labeled ddNTPs has become a standard practice in Sanger sequencing, particularly in high-throughput sequencing projects, contributing to the efficiency and automation of the sequencing process.

## Gel electrophoresis detection

TODO:

## From Theory to Practice

Translating these ideas into a working method required overcoming numerous technical challenges, such as:

-   Finding the right balance of dNTPs and ddNTPs
-   Developing efficient separation techniques
-   Creating sensitive detection methods (initially using radioactive labels, later fluorescent tags)

The elegance of Sanger sequencing lies in how it leverages fundamental principles of DNA structure and replication to solve the complex problem of determining nucleotide sequences. This method, born from careful reasoning and innovative thinking, revolutionized molecular biology and laid the groundwork for the genomic era.

[^sanger1977dna]: Sanger, F., Nicklen, S., & Coulson, A. R. (1977). DNA sequencing with chain-terminating inhibitors. *Proceedings of the national academy of sciences, 74*(12), 5463-5467. doi: [10.1073/pnas.74.12.5463](https://doi.org/10.1073/pnas.74.12.5463)
[^shendure2008next]: Shendure, J., & Ji, H. (2008). Next-generation DNA sequencing. *Nature biotechnology, 26*(10), 1135-1145. doi: [10.1038/nbt1486](https://doi.org/10.1038/nbt1486)

[^shuhaib2023mastering]: Al-Shuhaib, M. B. S., & Hashim, H. O. (2023). Mastering DNA chromatogram analysis in Sanger sequencing for reliable clinical analysis. *J. Genet. Eng. Biotechnol., 21*(1), 115. doi: [10.1186/s43141-023-00587-6](https://doi.org/10.1186/s43141-023-00587-6)
[^lopez2021sanger]: Arteche-López, A., Ávila-Fernández, A., Romero, R., Riveiro-Álvarez, R., López-Martínez, M. A., Giménez-Pardo, A., ... & Ayuso, C. (2021). Sanger sequencing is no longer always necessary based on a single-center validation of 1109 NGS variants in 825 clinical exomes. *Scientific reports, 11*(1), 5697. doi: [10.1038/s41598-021-85182-w](https://doi.org/10.1038/s41598-021-85182-w)
[^cario2020sanger]: De Cario, R., Kura, A., Suraci, S., Magi, A., Volta, A., Marcucci, R., ... & Sticchi, E. (2020). Sanger validation of high-throughput sequencing in genetic diagnosis: Still the best practice?. *Frontiers in genetics, 11*, 592588. doi: [10.3389/fgene.2020.592588](https://doi.org/10.3389/fgene.2020.592588)
[^giani2020long]: Giani, A. M., Gallo, G. R., Gianfranceschi, L., & Formenti, G. (2020). Long walk to genomics: History and current approaches to genome sequencing and assembly. *Computational and Structural Biotechnology Journal*, 18, 9-19. doi: [10.1016/j.csbj.2019.11.002](https://doi.org/10.1016/j.csbj.2019.11.002)
[^crossley2020guidelines]: Crossley, B. M., Bai, J., Glaser, A., Maes, R., Porter, E., Killian, M. L., ... & Toohey-Kurth, K. (2020). Guidelines for Sanger sequencing and molecular assay monitoring. *Journal of Veterinary Diagnostic Investigation, 32*(6), 767-775. doi: [10.1177/1040638720905833](https://doi.org/110.1177/1040638720905833)
