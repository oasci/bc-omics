---
title: Local
type: docs
---



The local alignment method seeks to find the regions of highest similarity within the sequences without necessarily aligning them from end to end.
Local alignment is beneficial in identifying functional domains, motifs, or other conserved sequence elements within larger, more variable sequences.
It allows researchers to pinpoint regions of similarity that may be biologically relevant, even when the overall sequence similarity is low.
The objective is to identify the segments within the sequences that align the best, disregarding other regions that might not align well.

## Smith-Waterman algorithm

Developed by Temple F. Smith and Michael S. Waterman in 1981, the Smith-Waterman algorithm is a cornerstone of bioinformatics.
It is designed specifically for local sequence alignment.
It distinguishes itself from global alignment algorithms by focusing on finding the highest-scoring local alignments between two sequences.
This is especially useful for comparing sequences with varying lengths or when only a portion is similar.
The algorithm uses dynamic programming to calculate the best possible alignment score between subsequences, employing a scoring matrix that rewards matches and penalizes mismatches and gaps.

Notably, the algorithm can be expanded to use two different penalties for gap opening and gap extension, addressing the biological reality that starting a new gap is energetically less favorable than extending an existing one.
This differentiation in gap penalties helps to minimize gaps in the alignment, mirroring biological sequences more accurately.

-   **Match Score:** The score given when two characters at the current position in the compared sequences are the same.
-   **Mismatch Penalty:** The score deducted when the characters do not match.
-   **Gap Penalty:** The penalty applied for introducing a gap in one of the sequences.

### Initialization

When we start with the Smith-Waterman algorithm, we first set up a grid or matrix.
This grid has one sequence listed across the top and the other down the side.
The first step is to fill in the top row and the leftmost column with zeros.
This is because we need a starting point for our calculations, and beginning with zeros allows us to build up scores from nothing, which makes sense for finding local alignments where the alignment could start anywhere within the sequences.

### Matrix filling

The matrix filling step is the core of the Smith-Waterman algorithm for local sequence alignment.
Let's break it down, keeping the mathematical notation but explaining each part in detail.

For each cell $(i,j)$ in our matrix $H$, we calculate the score using this formula:

$$
H(i,j) = \max \left\{ \begin{array}{l}
0, \\
H(i-1,j-1) + s(x_i, y_j), \\
\max_{k\geq1}\{H(i-k,j) - W_k\}, \\
\max_{l\geq1}\{H(i,j-l) - W_l\}
\end{array} \right.
$$

Let's break this down step by step:

1.  **$H(i,j)$**: This is the score we're calculating for the cell at position $(i,j)$ in our matrix.
2.  **$\max\{\}$**: We're taking the maximum value of four options. This means we'll choose the highest scoring option among them.
3.  **Option 1: $0$**
    -   This allows us to start a new alignment if all other options result in a negative score.
    -   It's crucial for finding local alignments, as it lets us "reset" when similarity decreases.
4.  **Option 2: $H(i-1,j-1) + s(x_i, y_j)$**
    -   This represents a match or mismatch between characters $x_i$ and $y_j$.
    -   $H(i-1,j-1)$ is the score from the diagonal upper-left cell.
    -   $s(x_i, y_j)$ is the scoring function:
        -   It returns a positive value (e.g., +2) if $x_i$ and $y_j$ match.
        -   It returns a negative value (e.g., -1) if they mismatch.
5.  **Option 3: $\max_{k\geq1}\{H(i-k,j) - W_k\}$**
    -   This represents introducing a gap in the sequence on the top of the matrix.
    -   We're looking at cells directly above our current position.
    -   $k$ is the gap length.
        This only comes into play when we have affine gap penalties where the score changes based on opening or extending a gap.
        We would have to try all possible values of $k$ to see which would maximize the score.
    -   $W_k$ is the penalty for a gap of length $k$.
6.  **Option 4: $\max_{l\geq1}\{H(i,j-l) - W_l\}$**
    -   This is similar to Option 3, but for introducing a gap in the sequence on the left side of the matrix.
    -   We're looking at cells directly to the left of our current position.

In other words:

-   If the letters from each sequence at that position are a match, we add to the score. We look back at the cell diagonally up-left from our current position, take its score, and add a certain number (let's say +2 for a simple example) because we found a match.
-   If the letters don't match, we might take a smaller score or subtract because it's not as good as a match.
-   We also consider skipping a letter in one of the sequences. This could happen if there's a gap in one sequence compared to the other. We take a small penalty for this, subtracting a little from our score.
-   The key here is we always pick the option that gives us the highest score, which could even be zero. We never let the score go negative because we're only interested in positive matches.

The case where $k > 1$ (considering gaps longer than one in a single step) comes into play primarily when using affine gap penalties.
However, it's crucial to understand that this is not typically how the basic Smith-Waterman algorithm is implemented.

In the standard implementation with linear gap penalties:

-   $k$ is always 1
-   We only look at the immediately adjacent cell $(i-1, j)$
-   The formula simplifies to $H(i-1, j) - W$, where $W$ is a fixed gap penalty

Affine gap penalties were introduced to more accurately model the biological reality of insertions and deletions.
They use two different penalties:

1.  Gap opening penalty ($o$): A larger penalty for starting a new gap
2.  Gap extension penalty ($e$): A smaller penalty for extending an existing gap

The penalty for a gap of length $k$ would be: $W_k = o + (k-1)e$

In this model, considering $k > 1$ during the matrix filling step could theoretically lead to optimal alignments in certain scenarios.
However, implementing this naively would be computationally expensive.

In practice, algorithms that use affine gap penalties (like Gotoh's algorithm, an extension of Smith-Waterman) don't actually consider all possible $k$ values at each step.
Instead, they use additional matrices to keep track of the best score ending with a gap in each sequence.
This allows them to efficiently handle affine gap penalties without explicitly calculating $\max_{k\geq1}\{H(i-k,j) - W_k\}$ at each step.

Considering $k > 1$ might be optimal in scenarios where:

1.  The gap opening penalty is significantly larger than the gap extension penalty.
2.  There's a long stretch of mismatches between the sequences.

In such cases, it might be more favorable to open one long gap rather than several short ones.
However, this is captured by the efficient implementation mentioned above without explicitly considering all k values.

Consider aligning these sequences with affine gap penalties:

-   Sequence 1: ACGTACGT
-   Sequence 2: ACGCGT

With penalties:

-   Match: +2
-   Mismatch: -1
-   Gap opening (o): -4
-   Gap extension (e): -1

An optimal alignment might be:

```text
ACGTACGT
ACG--CGT
```

This alignment has one gap of length 2, which scores better than two separate gaps:

-   One gap of length 2: -4 (opening) + -1 (extension) = -5
-   Two gaps of length 1: -4 (opening) + -4 (opening) = -8

#### Practical Implementation

In practice, especially for a basic implementation with linear gap penalties, you can simplify this to:

$$
H(i,j) = \max \left\{ \begin{array}{l}
0, \\
H(i-1,j-1) + s(x_i, y_j), \\
H(i-1,j) - W, \\
H(i,j-1) - W
\end{array} \right.
$$

Where $W$ is your fixed gap penalty.

#### Example Calculation

Let's say we're aligning `ACTG` with `ACG` using these scores:

-   Match: +2
-   Mismatch: -1
-   Gap: -2

For the cell comparing `T` from `ACTG` and `C` from `ACG`:

1.  $0$ (start new)
2.  $H(i-1,j-1) + s('T','C') = 4 + (-1) = 3$ (mismatch)
3.  $H(i-1,j) - W = 2 - 2 = 0$ (gap in `ACTG`)
4.  $H(i,j-1) - W = 2 - 2 = 0$ (gap in `ACG`)

The maximum of these is 3, so $H(i,j) = 3$.

#### Traceback

The traceback step finds the optimal local alignment by starting from the highest-scoring cell in the matrix and tracing back through the cells used to calculate its score until a cell with a score of 0 is reached.

-   Identify the cell $H(i, j)$ with the highest score in the matrix.
-   From $H(i, j)$, move to one of the following cells that was used to calculate $H(i, j)$, according to the rule that maximizes the score:
    -   To $H(i-1, j-1)$ if the move was a diagonal (indicating a match or mismatch).
    -   To $H(i-k, j)$ or $H(i, j-l)$ if the move was vertical or horizontal, indicating a gap of length $k$ or $l$.
-   The traceback continues until a cell with a score of 0 is reached, indicating the start of the optimal local alignment.

In other words:

-   We move from the highest score back towards the beginning, following the path that led to that high score. This could mean moving diagonally (which indicates a match), straight up, or straight left (which indicates a gap).
-   We stop tracing back when we hit a score of zero, which is our cue that this is where the best local alignment starts.

### Example

Consider two sequences to be aligned:

-   Sequence A: `ACTG`
-   Sequence B: `ACG`

We will use the following scoring scheme:

-   Match score: +2
-   Mismatch penalty: -1
-   Linear gap penalty: -2

Create a matrix $H$ with dimensions $5 \times 4$ (since `ACTG` is four characters and `ACG` is three characters, plus one for the initial zeros).

Fill the matrix based on the scoring rules. For simplicity, let's calculate a few cells:

-   For $H(1,1)$ (comparing `A` with `A`): the score is a match, so $H(1,1) = 2$.
-   For $H(2,1)$, considering a mismatch or gap introduces negative scores, we follow the rule that negative scores are reset to 0.

The filled matrix might look like this:

|  H   | | A | C | T | G |
|-----|---|---|---|---|---|
| | 0 | 0 | 0 | 0 | 0 |
| **A** | 0 | 2 | 0 | 0 | 0 |
| **C** | 0 | 0 | 4 | 2 | 0 |
| **T** | 0 | 0 | 2 | 3 | 1 |
| **G** | 0 | 0 | 0 | 1 | 5 |

Starting from the highest scoring cell, $H(4,4) = 5$, traceback reveals the alignment:

-   Sequence A: `ACTG`
-   Sequence B: `A-CG`

The score of 5 corresponds to three matches (`A`, `C`, `G`) and one gap (`-`).
