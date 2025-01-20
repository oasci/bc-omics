---
title: Shortest common superstring
type: docs
toc: false
---


The Shortest Common Superstring (SCS) problem involves finding the shortest string that contains all given strings as subsequences.
In simpler terms, if you have a set of strings, the challenge is to construct the smallest possible string that includes each of these strings as a part of it without necessarily keeping them contiguous but preserving their order.

DNA is broken into numerous small pieces in genome sequencing, sequenced to produce reads.
These reads are short sequences of nucleotides (`A`, `C`, `G`, `T`).
The main challenge is assembling these reads in the correct order to reconstruct the genome's original sequence.
This process is akin to solving the SCS problem, where each read is a string.
The goal is to merge them into a single, continuous sequence that is as short as possible while still containing all the original sequences.

The key to solving this problem lies in finding overlaps between the reads.
By identifying how the end of one read overlaps with the beginning of another, it's possible to stitch these reads together to minimize redundancy, thus approaching the shortest common superstring.

It's important to note that the SCS problem is NP-hard, meaning that no known algorithm can solve it efficiently for all possible input sets.
In the context of genome assembly, this complexity is managed through various heuristic and approximation algorithms that seek to find a solution that is good enough, if not mathematically perfect.

!!! example
    Imagine the original DNA sequence we aim to reconstruct is: `ACGTACGTGACG`.
    If we are provided three sequencing reads:

    1.  `5'- ACGTAC -3'`
    2.  `5'- TACGTG -3'`
    3.  `5'- TGAACG -3'`

    Identify initial overlaps:

    -   The suffix of Read 1 (`5'- ___TAC -3'`) overlaps with the prefix of Read 2 (`5'- TAC___ -3'`) by three nucleotides (`TAC`).

        ```text
        5'- A C G T A C -3'
                  | | |
              5'- T A C G T G -3'
        ```
    -   The suffix of Read 2 (`5'- ____TG -3'`) overlaps with the prefix of Read 3 (`5'- TG____ -3'`) by two nucleotides (`TG`).

        ```text
        5'- T A C G T G -3'
                    | |
                5'- T G A A C G -3'
        ```

    Merge based on largest overlaps:

    -   Merging Read 1 and Read 2 through their overlap gives us `5'- ACGTACGTG -5'`.
    -   Then, merging this combined sequence with Read 3 by aligning the overlap of GT gives us the shortest complete sequence `5'- ACGTACGTGAACG -3'`.

!!! warning

    When we discuss an overlap between two sequences in the context of DNA sequencing or bioinformatics, we refer to the condition where the suffix of one sequence matches the prefix of another sequence.
    This scenario facilitates the sequential alignment and assembly of fragments into a longer, continuous sequence.

    If the suffix of one sequence matches the suffix of another, we do not typically describe this as an overlap in the context of sequencing assembly or similar applications.
    This is because such a match does not provide a way to extend the sequence by combining the two sequences end-to-end.
    Instead, it indicates that both sequences end in the same way but does not necessarily provide a direct means of linking one sequence to the beginning of another to form a longer chain.

    **Overlap Case** (Suffix of $x$ matches Prefix of $y$).

    $$
    x = 5' [G, C, G, T, A, C] 3'
    $$

    $$
    y = 5' [T, A, C, A, C] 3'
    $$

    Here, if the suffix of $x$ (e.g., $[T, A, C]$) matches the prefix of $y$ (e.g., $[T, A, C]$), we can align and connect these sequences to form a longer sequence because there is a continuity that allows for extension.

    ```text
    5'- G C G T A C -3'
              | | |
          5'- T A C A C -3'
    ```

    **Non-Overlap Case** (Suffix of $x$ matches Suffix of $y$).

    If the suffix of $x$ (e.g., $[A, C]$) matches the suffix of $y$ (e.g., $[A, C]$), there is no direct way to extend the sequence by concatenating $x$ and $y$ because both sequences end in the same manner.

    ```text
    5'- G C G T A C -3'
          X X X | |
      5'- T A C A C -3'
    ```

    This scenario doesn't contribute to the assembly of a longer sequence from fragments.
