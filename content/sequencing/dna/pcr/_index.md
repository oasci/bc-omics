---
title: Polymerase chain reaction
type: docs
weight: 2
---

The polymerase chain reaction (PCR) is a laboratory nucleic acid amplification technique used to denature and renature short segments of deoxyribonucleic acid (DNA) or ribonucleic acid (RNA) sequences using DNA polymerase I enzyme, an isolate from Thermus aquaticus, known as Taq DNA. [^lorenz2012polymerase]
In 1985, PCR was introduced by Mullis and colleagues for which they received a Nobel prize.
It is a monumental tool used in biomolecular sciences for its profound ability to examine and detect amplified components of DNA.

PCR is a procedure that selectively focuses on a minuscule segment of DNA in a test tube. [^markham1993polymerase]
Thermostability has the propensity to resist irreversible alterations in chemical and physical properties in extreme temperatures.
Following several repetitive cycles of denaturation and renaturation in PCR procedures, Taq polymerase enzyme is preferred due to its heat-stable property, thus, allowing for the continuation of DNA synthesis despite the exposure of primers.
PCR has been the prominent procedure of choice in diagnosing a wide array of bacterial and viral infections, as well as screening genetic diseases due to its high sensitivity making it the gold standard testing procedure for numerous samples.

Polymerase chain reaction procedures begin with the collection of a small sample of DNA in a test tube.
PCR consists of three major phases: denaturation, hybridization/annealing, elongation/amplification.

## Denaturation

During the denaturation phase, DNA is heated to 95 celsius (C) to dissociate the hydrogen bonds between complementary base pairs of the double-stranded DNA.

## Annealing

Immediately following denaturation, the process of annealing occurs; annealing involves cooling the denatured DNA at a temperature ranging from 37-72 C allowing for the hydrogen bonds to reform.
Annealing best occurs at temperatures between 55 C to 72 C.

The specific temperature is determined based on the physical and chemical properties of the specific primers used in the solution.
Primers are 20-25 nucleotides in length.
Annealing allows for the primers to bind to the single-stranded DNA at their respective complementary sites beginning at the 3’ end of the DNA template.
Subsequently, the binding of the primers to their complementary sites on single-stranded DNA generates two double-stranded molecules.

### Standard primers

The M13-tailed primers are used to simplify the workflow when sequencing PCR products and they reduce the loss of the 5' unresolvable bases.
When the PCR primers contain M13 tails on their 5' ends, the M13 sequence is incorporated into the amplicons.
This enables sequencing master mixes containing the universal M13 forward, or M13 reverse primers.
The sequence for the M13 forward and reverse primers is as follows:

-   M13 forward primer sequence: `5′ TGTAAAACGACGGCCAGT 3′`
-   M13 reverse primer sequence: `5′ CAGGAAACAGCTATGACC 3′`

The primer is designed for the known sequences at the 3' end of the template strand.
M13 sequences are generally attached to the 3' end, and the primer of this M13 is made.

## Elongation

Finally, an optimal reaction temperature, 75-80 C, that is best suitable for enzyme-induced DNA replication is selected to ensure DNA polymerase activity.

In order to initiate the functionality of DNA polymerase, double-stranded DNA is mandatory for the occurrence of replication.
Thereafter, DNA polymerase synthesizes DNA in a 3’ to 5’ direction producing strands identical to the template strands.
This procedure is repeated several times via a thermal cycler.
A thermal cycler is a device that controls the time and temperature of each cycle and its respective steps.
This ultimately leads to several duplicated DNA available in the tube.

> This model simplifies the complex process of DNA replication, omitting enzymes like DNA polymerase and other cellular factors. It aims to visualize the basic concept of complementary base pairing and the directionality of DNA synthesis.
> 
> <div id="dna-elongation-container" style="width: 100%; max-width: 800px; margin: 0 auto;"></div>
> <script src="/p5/dna-elongation/dna-elongation.js"></script>
> 
> [Full screen](/p5/dna-elongation/dna-elongation.html)
> 
> This interactive animation demonstrates a simplified model of DNA replication, specifically the elongation phase:
> 
> -   **Template Strand**: The top strand represents the 3' to 5' template DNA strand, serving as the blueprint for replication.
> -   **Growing Strand**: The bottom strand shows the newly synthesizing DNA, growing in the 5' to 3' direction.
> -   **Floating Nucleotides**: Colorful shapes (circles and squares) represent free nucleotides (A, T, C, G) moving randomly in solution, simulating Brownian motion.
> -   **Base Pairing**: When a complementary nucleotide approaches the growing strand's end, it attaches, extending the new DNA strand.
>         This process follows the base-pairing rule (A with T, C with G).
> -   **Speed Control**: Use the slider in the top left corner to adjust the simulation speed.
>         Higher values accelerate the movement and replication process.
> -   **Restart Button**: Click 'Restart' to begin a new replication cycle with a fresh template strand.

## Cycling

Following 30-40 cycles, repetitive cycles eventually taper off due to the limited capability of the reagent as well as other contributing factors such as accumulation of pyrophosphate molecules, excessive self-annealing, and the presence of PCR inhibitors in the sample.
There are several inhibitors that can affect the proper functioning of PCR. The most common PCR inhibitors are proteinase K, phenol, Ethylenediaminetetraacetic acid (EDTA).

## Acknowledgements

Material is reused with permission from StatPearls Publishing LLC under the [CC BY-NC-ND 4.0](http://creativecommons.org/licenses/by-nc-nd/4.0/) license.

<!-- REFERENCE -->

[^lorenz2012polymerase]: Lorenz, T. C. (2012). Polymerase chain reaction: basic protocol plus troubleshooting and optimization strategies. JoVE (Journal of Visualized Experiments), (63), e3998.
[^markham1993polymerase]: Markham, A. F. (1993). The polymerase chain reaction: a tool for molecular medicine. BMJ: British Medical Journal, 306(6875), 441.
