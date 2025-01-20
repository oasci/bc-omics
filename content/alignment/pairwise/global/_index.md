---
title: Global
type: docs
---


Global pairwise sequence alignment is a computational technique used in bioinformatics to align two DNA sequences and identify regions of similarity that may indicate functional, structural, or evolutionary relationships between them.
This method is essential for various applications, including gene identification, phylogenetic analysis, and the study of evolutionary biology.

## Needleman-Wunsch algorithm

The Needleman-Wunsch algorithm,[^needleman1970general] developed by Saul B. Needleman and Christian D. Wunsch in 1970, is a pioneering method in bioinformatics for aligning protein or nucleotide sequences.
This algorithm was among the first applications of dynamic programming to compare biological sequences.
It introduced a systematic way to tackle the complex problem of sequence alignment by breaking it down into smaller, manageable parts.

The algorithm operates on optimizing the global alignment between two sequences.
It generates all possible alignments, scoring each based on a predefined scoring system and identifying the alignment(s) with the highest score as the optimal solution.
This approach ensures that the alignment spans the entire length of both sequences, accommodating matches, mismatches, and gaps (insertions or deletions) to maximize the overall alignment score.
The process of the Needleman-Wunsch algorithm can be divided into three main steps: initialization, matrix filling, and traceback.

### Initialization

The initialization phase involves creating a scoring matrix, $T$, with one sequence (Seq1: "ATTAC") on the x-axis and the other (Seq2: "AATTC") on the y-axis.

The scoring matrix is initialized as follows:

-   Start with a cell $(0,0)$ having a score of $0$.
-   Each subsequent cell in the first row and column is assigned a gap penalty, which accumulates linearly.
    For a gap penalty of $-1$, the initialization looks like this:

| **D** |   | **A** | **A** | **T** | **T** | **C** |
|---|---|---|---|---|---|---|
|   | 0 | -1| -2| -3| -4| -5|
| **A** | -1|   |   |   |   |   |
| **T** | -2|   |   |   |   |   |
| **T** | -3|   |   |   |   |   |
| **A** | -4|   |   |   |   |   |
| **C** | -5|   |   |   |   |   |

### Filling the Matrix

To fill the matrix, we calculate the score for each cell using the following equation:

$$
\text{D}(i,j) = \max\begin{cases}
T[i-1,j-1] + s(a,b) & \text{(diagonal, match/mismatch)} \\
T[i-1,j] - \text{gap penalty} & \text{(up, gap)} \\
T[i,j-1] - \text{gap penalty} & \text{(left, gap)}
\end{cases}
$$

where $s(a,b)$ is the score of aligning character $a$ from Seq1 with character $b$ from Seq2.
For example, $s(A,A) = +1$ for a match and $s(A,T) = -1$ for a mismatch.
The gap penalty is typically $-1$.

Let's calculate the score for cell $(1,1)$, assuming $s(A,A) = +1$ and the gap penalty as $-1$:

-   From diagonal ($T[0,0]$): $0 + 1 = 1$
-   From up ($T[0,1]$): $-1 - 1 = -2$
-   From left ($T[1,0]$): $-1 - 1 = -2$

The maximum of these scores is $1$, so $T[1,1] = 1$.

| **D** |   | **A**  | **A**  | **T**  | **T**  | **C**  |
|---|---|----|----|----|----|----|
|   | 0 | -1 | -2 | -3 | -4 | -5 |
| **A** | -1| 1  | 0  | -1 | -2 | -3 |
| **T** | -2| 0  | 0  | 1  | 0  | -1 |
| **T** | -3| -1 | -1 | 1  | 2  | 1  |
| **A** | -4| -2 | 0  | 0  | 1  | 1  |
| **C** | -5| -3 | -1 | -1 | 0  | 2  |

### Traceback

Once the matrix is filled, we find the optimal path by starting from the bottom-right corner and moving to the cell that contributed to its score until we reach $(0,0)$.
The path to each cell indicates whether the characters are aligned (diagonal move), or a gap is introduced (up or left move).
For instance, if the final cell's score was obtained from a diagonal move, it suggests a match or mismatch based on the alignment score.
If the score came from moving up or left, it indicates introducing a gap in Seq1 or Seq2, respectively.

Given the sequences Seq1: "ATTAC" and Seq2: "AATTC", let's illustrate a simplified example of filling one more cell and performing a traceback:

-   For cell $(2,1)$, we consider:
-   Diagonal ($T[1,0] - 1 = -2$) for a mismatch,
-   Up ($T[1,1] - 1 = 0$) for a gap,
-   Left ($T[2,0] - 1 = -3$) for a gap.

Choosing the highest score, we fill $T[2,1]$ with $0$ to introduce a gap.

The traceback process would then start from $T[5,5]$, considering the entire matrix filled, and proceed to $T[0,0]$, highlighting the optimal alignment.

**Example 1:**

```text
-  A  T  T  A  C
#  *  *  *  #  *
A  A  T  T  -  C```
```

Score = 2

| **D** |   | **A** | **A** | **T** | **T** | **C** |
|---|---|----|-----|----|----|----|
|   | **0** | **-1** | -2  | -3 | -4 | -5 |
| **A** | -1 | 1  | **0** | -1 | -2 | -3 |
| **T** | -2 | 0  | 0   | **1** | 0  | -1 |
| **T** | -3 | -1 | -1  | 1  | **2** | 1  |
| **A** | -4 | -2 | 0   | 0  | **1** | 1  |
| **C** | -5 | -3 | -1  | -1 | 0  | **2** |

**Example 2:**

```text
A  -  T  T  A  C
*  #  *  *  #  *
A  A  T  T  -  C
```

Score = 2

| **D** |   | **A**   | **A**  | **T**  | **T**  | **C**  |
|---|---|-----|----|----|----|----|
|   | **0** | -1  | -2 | -3 | -4 | -5 |
| **A** | -1 | **1** | **0** | -1 | -2 | -3 |
| **T** | -2 | 0   | 0  | **1** | 0  | -1 |
| **T** | -3 | -1  | -1 | 1   | **2** | 1  |
| **A** | -4 | -2  | 0  | 0   | **1** | 1  |
| **C** | -5 | -3  | -1 | -1  | 0   | **2** |

### Example

|   | - | **G** | **C** | **A** | **T** | **G** | **C** | **G** |
|---|---| ---|---|---|---|---|---|---|
| - |   |   |   |   |   |   |   |  |
| **G** |   |   |   |   |   |   |   |  |
| **A** |   |   |   |   |   |   |   |  |
| **T** |   |   |   |   |   |   |   |  |
| **T** |   |   |   |   |   |   |   |  |
| **A** |   |   |   |   |   |   |   |  |
| **C** |   |   |   |   |   |   |   |  |
| **A** |   |   |   |   |   |   |   |  |

Each of these scenarios is assigned a score and the sum of the scores of all the pairings is the score of the whole alignment candidate.
Different systems exist for assigning scores; some have been outlined in the Scoring systems section below.
For now, the system used by Needleman and Wunsch will be used:

-   Match: +1
-   Mismatch or Indel: −1

Start with a zero in the second row, second column.
Move through the cells row by row, calculating the score for each cell.
The score is calculated by comparing the scores of the cells neighboring to the left, top or top-left (diagonal) of the cell and adding the appropriate score for match, mismatch or indel.
Calculate the candidate scores for each of the three possibilities:

-   The path from the top or left cell represents an indel pairing, so take the scores of the left and the top cell, and add the score for indel to each of them.
-   The diagonal path represents a match/mismatch, so take the score of the top-left diagonal cell and add the score for match if the corresponding bases (letters) in the row and column are matching or the score for mismatch if they do not.

The resulting score for the cell is the highest of the three candidate scores.

Given there is no 'top' or 'top-left' cells for the second row only the existing cell to the left can be used to calculate the score of each cell.
Hence −1 is added for each shift to the right as this represents an indel from the previous score.
This results in the first row being 0, −1, −2, −3, −4, −5, −6, −7.
The same applies to the first column as only the existing score above each cell can be used.
Thus the resulting table is:

|  D    | - | **G** | **C** | **A** | **T** | **G** | **C** | **G** |
|------ |---| --- |---|---|---|---|---|---|
| -     | 0 |  -1 | -2  | -3  | -4  | -5  | -6  | -7 |
| **G** | -1 |   |   |   |   |   |   |  |
| **A** | -2 |   |   |   |   |   |   |  |
| **T** | -3 |   |   |   |   |   |   |  |
| **T** | -4 |   |   |   |   |   |   |  |
| **A** | -5 |   |   |   |   |   |   |  |
| **C** | -6 |   |   |   |   |   |   |  |
| **A** | -7 |   |   |   |   |   |   |  |

The first case with existing scores in all 3 directions is the intersection of our first letters (in this case G and G).
The surrounding cells are below:

|  D    | - | **G** |
|------ |---| --- |
| -     | 0 |  -1 |
| **G** | -1 | **X**  |

This cell has three possible candidate sums:

-   The diagonal top-left neighbor has score 0. The pairing of G and G is a match, so add the score for match: 0+1 = 1
-   The top neighbor has score −1 and moving from there represents an indel, so add the score for indel: (−1) + (−1) = (−2)
-   The left neighbor also has score −1, represents an indel and also produces (−2).

The highest candidate is 1 and is entered into the cell:

|   D    | - | **G** |
|------ |---| --- |
| -     | 0 |  -1 |
| **G** | -1 | **1**  |

The cell which gave the highest candidate score must also be recorded. In the completed diagram in figure 1 above, this is represented as an arrow from the cell in row and column 3 to the cell in row and column 2.

In the next example, the diagonal step for both X and Y represents a mismatch:

|   D    | - | **G** | **C** |
|------ |---| --- |---|
| -     | 0 |  -1 | -2  |
| **G** | -1 | 1  | **X**  |
| **A** | -2 | **Y**  |   |

X:

-   Top: (−2)+(−1) = (−3)
-   Left: (+1)+(−1) = (0)
-   Top-Left: (−1)+(−1) = (−2)

Y:

-   Top: (1)+(−1) = (0)
-   Left: (−2)+(−1) = (−3)
-   Top-Left: (−1)+(−1) = (−2)

For both X and Y, the highest score is zero:

|    D   | - | **G** | **C** |
|------ |---| --- |---|
| -     | 0 |  -1 | -2  |
| **G** | -1 | 1  | **0**  |
| **A** | -2 | **0**  |   |

<!-- REFERENCES -->

[^needleman1970general]: Needleman, S. B., & Wunsch, C. D. (1970). A general method applicable to the search for similarities in the amino acid sequence of two proteins. *Journal of molecular biology, 48*(3), 443-453. doi: [10.1016/0022-2836(70)90057-4](https://doi.org/10.1016/0022-2836(70)90057-4)
