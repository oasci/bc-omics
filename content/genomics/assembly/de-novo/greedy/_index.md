---
title: Greedy algorithms
type: docs
toc: false
---



Greedy algorithms are a class of algorithms in computer science that make the most optimal choice at each step as they work towards finding the overall optimal solution to a problem.
The "greediness" of these algorithms comes from their approach to make the locally optimal choice at each step with the hope that these local solutions will lead to a globally optimal solution.
Greedy algorithms are quite powerful in solving a wide range of problems, including those in computational biology, due to their efficiency and simplicity.

## Overview

The de novo assembly process using a greedy algorithm typically consists of several vital steps.
First, pairwise distances between reads are calculated, assessing the degree of overlap between sequences.
This information is then utilized to cluster reads with the greatest overlap, forming groups of potentially contiguous genomic regions.
Subsequently, reads are assembled within each cluster into longer contiguous sequences, or contigs, based on their overlapping regions.
This assembly step is crucial for piecing together the fragmented genomic information in the original short reads.

The process is iterative, as the algorithm refines the assembly by repeatedly calculating distances, clustering, and assembling reads. However, by nature, greedy algorithms may result in locally optimal solutions and struggle to reach a global optimum.
Additionally, repetitive sequences in the genome pose a challenge, as it can lead to ambiguities and errors in the assembly.

## Preliminaries

Let's assume that we have some string, $x$, that has $l$ symbols from the set ${A, C, G, T}$.
For example,

$$
x = [A, A, C, T, G, C, G].
$$

A substring of $x$ is a continuous interval of the symbols in $x$, and it is denoted as

$$
x[i:j] = (x[i], x[i + 1], \ldots, x[j]).
$$

This looks very similar to slicing Python lists!
For example,

```python
dna_seq = ["A", "A", "C", "T", "G", "C", "G"]
```

if we wanted the `CTG` substring we would use

```python
dna_seq[2:5]
```

!!! info

    We are going to assume that that $i$ starts at zero to be consistent with Python indexing.
    Most mathematical formulations start at 1.

### Prefix

When the first index of the substring is `0`, we give this a special name called the prefix.
For example, `dna_seq[0:3]` and `dna_seq[0:2]` would be valid prefixes; the only thing that is changing is the length of the substring.
We will refer to this as $x_l$.

### Suffix

A suffix is when we slice a portion from the end; for example, `dna_seq[2:l]` would give us `["C", "T", "G", "C", "G"]` if we assume that `l` is the total length of `dna_seq`.
We will refer to this as $x^l$.

One way to keep track if $x_l$ or $x^l$ is the prefix or suffix substring is to imaging we have our DNA sequence vertically from beginning (bottom) to end (top).
Thus, $x_l$ would be near the bottom of $x$ so that is the prefix substring.
$x^l$ would be near the top of $x$ so that is the suffix substring.

## Overlap

In the context of DNA sequences, an overlap occurs when the suffix of one sequence ($x^l$) is identical to the prefix of another sequence ($y_l$).
This means that the end portion of the first sequence ($x$) matches the starting portion of the second sequence ($y$).
We can arbitrarily select each sequence to be $x$ or $y$, so an overlap could also be $x_l$ and $y^l$.

## Greedy algorithm

Tarhio and Ukkone[^tarhio1988greedy] developed an algorithm for solving the [shortest common superstring problem](../../#shortest-common-superstring).
They state that the "greedy" approximation is to:

> find and remove two strings in $R$ which have the longest mutual overlap amongst all possible pairs in $R$.
> Then form the overlapped string from the removed two strings and replace it back in $R$.
> Repeat this until there is only one string in $R$ or no two strings have a nonempty overlap.

The greedy algorithm for the shortest common superstring problem operates under a simple yet effective heuristic: repeatedly merge the pair of strings with the maximum overlap until no more merges are possible.
Here's a step-by-step breakdown:

1.  **Initialization:** Begin with a set of strings $R$.
2.  **Find the Longest Overlap:** At each step, examine all possible pairs of strings in $R$ to identify the two strings with the longest mutual overlap. The overlap between two strings $a$ and $b$ is the longest suffix of $a$ that matches a prefix of $b$ or vice versa.
3.  **Merge Strings:** Once the pair with the longest mutual overlap is found, merge these two strings into a single string. This merging involves combining the two strings into one, where the overlap is not duplicated but instead used to connect the strings.
4.  **Repeat or Terminate:** Replace the original two strings in $R$ with the newly formed string. If $R$ now contains only one string, or if no pairs of strings have a nonempty overlap, the process terminates. Otherwise, return to step 2 and repeat.
5.  **Result:** The algorithm ends with a single string that represents the shortest common superstring of the original set $R$, according to the greedy criterion of maximizing overlaps at each step.

### Breaking ties

What if you encounter two or more pairs of strings with overlaps of the same length that also result in superstrings of the same size when merged?
The choice between these overlaps can be somewhat arbitrary from the algorithm's perspective.
The greedy algorithm prioritizes maximizing the overlap length at each step to approximate the shortest common superstring.
Still, it doesn't inherently prioritize among equally maximal overlaps based on any further criteria.

In cases where two overlaps are of the same amount and merging them results in superstrings of the same length, you can consider the following approaches:

-   **First Found, First Merged:** Simply merge the first pair you identify with the maximal overlap.
    This approach is straightforward and keeps the algorithm moving but doesn't attempt to optimize beyond the overlap length.
-   **Lexicographical Order:** Some implementations might choose between equivalent overlaps based on lexicographical order or another deterministic rule.
    This can help ensure consistency in results, especially when the algorithm is run multiple times or in parallel.
-   **Random Selection:** Randomly selecting among the pairs with maximal overlaps is another approach.
    However, it introduces nondeterminism into the algorithm, potentially leading to different run results.
-   **Consider Future Overlap Potential:** While not a part of the basic greedy algorithm, one could anticipate which merge might lead to longer overlaps in subsequent steps.
    However, this approach significantly complicates the algorithm, moving away from its greedy nature and requiring lookahead, which may not be feasible or efficient in practice.

In the context of the greedy algorithm for sequence assembly or similar applications, the specific choice among equally good overlaps might not significantly impact the overall goal of constructing a superstring efficiently.
The primary concern is creating a superstring that includes all sequences rather than finding the optimal superstring, which is a more complex problem.

## Example

Suppose we have the following set of strings $R$ = {`AGT`, `GTAC`, `ACCA`, `CAG`, `GAC`}.
The goal is to ensure each step accurately reflects finding and merging strings with the longest prefix-to-suffix overlap.

First, let's correctly identify all possible overlaps.
Overlaps should be considered based on the suffix of one string matching the prefix of another.

-   `GTAC` + `ACCA`: Overlap is `AC` and would merge into `GTACCA`.
-   `AGT` + `GTAC`: Overlap is `GT` and would merge into `AGTAC`.
-   `CAG` + `GAC`: Overlap is `G` and would merge into `CAGAC`.
-   `GAC` + `CAG`: Overlap is `C` and would merge into `GACAG`.
-   `ACCA` + `AGT`: Overlap is `A` and would merge into `ACCAGT`.

We have the same overlap size for two of them.
The first one, `GTAC` + `ACCA`, would result in a longer sequence, so we chose this.
Now we have {`GTACCA`, `AGT`, `CAG`, `GAC`}.
Possible overlaps would be:

-   `AGT` + `GTACCA`: Overlap is `GT` and would merge to `AGTACCA`.
-   `GTACCA` + `CAG`: Overlap is `CA` and would merge to `GTACCAG`.
-   `GTACCA` + `AGT`: Overlap is `A` and would merge to `GTACCAGT`.
-   `CAG` + `GTACCA`: Overlap is `G` and would merge to `CAGTACCA`.
-   `CAG` + `GAC`: Overlap is `G` and would merge to `CAGGAC`.
-   `GAC` + `CAG`: Overlap is `C` and would merge to `GACAG`.

Merging `AGT` + `GTACCA` and `GTACCA` + `CAG` has the same overlap of two nucleotides; however, there is no difference in the resulting length of the merged sequence.
Which do you choose?
It depends on the type of greedy algorithm you are using, but picking one at random is often the simplest.
Let's see what happens based on our choice.

**A. Merge `AGT` + `GTACCA`**

{`AGTACCA`, `CAG`, `GAC`}

-   `CAG` + `AGTACCA`: Overlap is `AG` and would merge to `CAGTACCA`.
-   `AGTACCA` + `CAG`: Overlap is `CA` and would merge to `AGTACCAG`.
-   `CAG` + `GAC`: Overlap is `G` and would merge to `CAGGAC`.
-   `GAC` + `CAG`: Overlap is `C` and would merge to `GACAG`.

**B. Merge `GTACCA` + `CAG`**

{`GTACCAG`, `AGT`, `GAC`}

-   `AGT` + `GTACCAG`: Overlap is `GT` and would merge to `AGTACCAG`.
-   `GTACCAG` + `AGT`: Overlap is `AG` and would merge to `GTACCAGT`.
-   `GTACCAG` + `GAC`: Overlap is `G` and would merge to `GTACCAGAC`.

Making choice **A** would provide more possible merges than **B**.
Also, the top choices result in three different possible sequences: `CAGTACCA`, `AGTACCAG`, and `GTACCAGT`.

**A1. Merge `CAG` + `AGTACCA`**

{`CAGTACCA`, `GAC`}

-   `GAC` + `CAGTACCA`: Overlap is `C` and would merge to `GACAGTACCA`.

**A2. Merge `AGTACCA` + `CAG`**

{`AGTACCAG`, `GAC`}

-   `AGTACCAG` + `GAC`: Overlap is `G` and would merge to `AGTACCAGAC`.

**B1. Merge `AGT` + `GTACCAG`**

{`AGTACCAG`, `GAC`}

-   `AGTACCAG` + `GAC`: Overlap is `G` and would merge to `AGTACCAGAC`.

**B2. Merge `GTACCAG` + `AGT`**

{`GTACCAGT`, `GAC`}

-   No merge possible.

We see that if we merge `GTACCAG` + `AGT` (**B2**), there is no way to combine the last string `GAC`; thus, this is not a valid move.
If we merged `AGT` + `GTACCAG` (**B1**) we would get `AGTACCAGAC`, the same as move **A2** with `AGTACCA` + `CAG`.
However, **A1** gives us a completely different option of `GACAGTACCA`.

Which one is correct?
They are both equally valid as we followed all algorithm rules, and the length of the final string is 10 for both.

## Characteristics and Limitations

The greedy algorithm is efficient in terms of computation, especially compared to exhaustive search methods. It's suitable for practical applications where exact solutions are not necessary.

While the algorithm is fast, it does not guarantee an optimal solution. The shortest common superstring it finds is an approximation of the true shortest superstring.

Despite its limitations, this algorithm is widely used in bioinformatics for tasks like genome assembly, where sequences are merged based on overlaps to reconstruct the original genome.

The greedy algorithm's simplicity and the efficiency make it a powerful tool in scenarios where an approximate solution is sufficient and time is of the essence.
Its application to problems like genome assembly underscores its utility in handling complex, real-world problems where exact solutions are impractical to compute.

<!-- REFERENCES -->

[^huson2001greedy]: Huson, D. H., Reinert, K., & Myers, E. (2001, April). The greedy path-merging algorithm for sequence assembly. In Proceedings of the fifth annual international conference on Computational biology (pp. 157-163). doi: [10.1145/369133.369190](https://doi.org/10.1145/369133.369190)
[^shomorony2016information]: Shomorony, I., Kim, S. H., Courtade, T. A., & Tse, D. N. (2016). Information-optimal genome assembly via sparse read-overlap graphs. *Bioinformatics, 32*(17), i494-i502. doi: [10.1093/bioinformatics/btw450](https://doi.org/10.1093/bioinformatics/btw450)
[^bresler2013optimal]: Bresler, G., Bresler, M. A., & Tse, D. (2013, April). Optimal assembly for high throughput shotgun sequencing. In BMC bioinformatics (Vol. 14, No. 5, pp. 1-13). BioMed Central. doi: [10.1186/1471-2105-14-S5-S18](https://doi.org/10.1186/1471-2105-14-S5-S18)
[^tarhio1988greedy]: Tarhio, J., & Ukkonen, E. (1988). A greedy approximation algorithm for constructing shortest common superstrings. *Theoretical computer science, 57*(1), 131-145. doi: [10.1016/0304-3975(88)90167-3](https://doi.org/10.1016/0304-3975(88)90167-3)
