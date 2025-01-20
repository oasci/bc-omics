---
title: Coverage
type: docs
toc: false
---



> [!CAUTION]
> 
> This page is a work in progress and is subject to change at any moment.

Starting with some notation, let

-   $G$ = Length of the genome,
-   $L$ = Read length,
-   $N$ = Number of reads.

We assume that $L$ is fixed.
We first derive a relationship between the above three values that would result in successful assembly.
Since $L$ and $G$ are fixed with our choice of experiment and technology, we need to choose $N$ (i.e., "How much sequencing do I need to do?").
Intuitively, the reads must cover the entire genome, and each base has to be covered by at least 1 read.
Therefore $LN>G$ or $N>G/L$.
In order to achieve this lower bound, we need to have all $LN$ reads aligning perfectly without overlap, which is highly unlikely.

It turns out that if we let ϵ represent the probability of not achieving full genome coverage, then

$$
N \leq \frac{G}{L} \ln \left( \frac{G}{\varepsilon} \right)
\tag{1}
$$

If this condition is met, then we have achieved coverage with probability $\leq 1 - \varepsilon$.
This result is more stringent than our previous bound due to the ln(G/ϵ) term, which is greater than 1.

In isolation, $N$ is not too informative.
For a particular sequencing experiment, $N$=100 million reads could be large or small depending on the size of the genome and the length of each read.
Because the reads are random, some bases will be covered more often than other bases.
Therefore rather than using $N$, we are instead interested in the coverage depth, or the average coverage per base, which is described by

$$
c = \frac{NL}{G} \leq \ln \left( \frac{G}{\varepsilon} \right).
\tag{2}
$$

As an example, if the genome of interest is about one billion base pairs long, then we need at least 25x coverage depth since $G = 10^{9}$; $\varepsilon = 0.01$, $\Rightarrow c = 25.328$.
Note that $LG$ is quite small, and therefore the number of reads can be approximated with a Poisson distribution with mean

$$
c= \frac{NL}{G}.
\tag{3}
$$
