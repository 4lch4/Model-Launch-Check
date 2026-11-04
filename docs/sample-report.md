# model-launch-check report

_2026-11-04T00:09:44.061Z_ - 5 models - 6 prompts - 3 run(s) - **$0.13053** total

## Summary

| Model                            | Median TTFT | Median total | Input tok | Output tok | Cost     | Errors | Truncated |
| -------------------------------- | ----------- | ------------ | --------- | ---------- | -------- | ------ | --------- |
| DeepSeek V4.1 Flash (OpenRouter) | 750 ms      | 2,519 ms     | 1,623     | 9,861      | $0.00577 | 0/18   | 7/18      |
| GPT-6 Luna (OpenRouter)          | 3,626 ms    | 3,915 ms     | 1,167     | 4,699      | $0.00247 | 0/18   | 0/18      |
| Haiku 5.5 (OpenRouter)           | 894 ms      | 1,640 ms     | 1,659     | 5,768      | $0.00305 | 0/18   | 3/18      |
| Sonnet 5.5 (Anthropic direct)    | 762 ms      | 3,202 ms     | 1,659     | 5,757      | $0.06089 | 0/18   | 0/18      |
| Sonnet 5.5 (OpenRouter)          | 789 ms      | 2,411 ms     | 1,659     | 5,504      | $0.05836 | 0/18   | 0/18      |

## Truncated before any visible text

These responses hit the token limit before producing any visible output. The output tokens were still billed.

| Model                            | Prompt             | Output tok | Cost     |
| -------------------------------- | ------------------ | ---------- | -------- |
| DeepSeek V4.1 Flash (OpenRouter) | code-debounce      | 1,000      | $0.00050 |
| DeepSeek V4.1 Flash (OpenRouter) | reasoning-tradeoff | 800        | $0.00040 |
| DeepSeek V4.1 Flash (OpenRouter) | reasoning-tradeoff | 800        | $0.00040 |
| DeepSeek V4.1 Flash (OpenRouter) | refusal-boundary   | 800        | $0.00053 |
| DeepSeek V4.1 Flash (OpenRouter) | refusal-boundary   | 800        | $0.00053 |
| DeepSeek V4.1 Flash (OpenRouter) | refusal-boundary   | 800        | $0.00053 |
| DeepSeek V4.1 Flash (OpenRouter) | summarize-incident | 800        | $0.00054 |

## Prompts

### short-fact - short

> In two sentences, explain what time to first token (TTFT) measures and why it matters for chat apps.

<details>
<summary>DeepSeek V4.1 Flash (OpenRouter) - 3 runs - median ttft 597 ms</summary>

ttft 597 ms - total 701 ms - 159 in - 421 out - $0.00022 total

**Run 1**

_stop: complete (stop)_

Time to first token (TTFT) measures the delay between sending a request and receiving the first token of the model’s response. It matters for chat apps because it strongly shapes perceived responsiveness—lower TTFT makes conversations feel snappy and natural, while higher TTFT can make users think the app is slow or stuck.

---

**Run 2**

_stop: complete (stop)_

Time to first token (TTFT) measures the delay between sending a request and receiving the first token of the model’s response. It matters for chat apps because it strongly shapes perceived responsiveness—users feel the app is fast when the first words appear quickly, even if the full answer takes longer to stream.

---

**Run 3**

_stop: complete (stop)_

Time to first token (TTFT) measures the latency from when a user sends a prompt until the model generates the first token of its response. It matters for chat apps because it determines how quickly users see the assistant start replying, which strongly affects perceived responsiveness and overall user experience.

</details>

<details>
<summary>GPT-6 Luna (OpenRouter) - 3 runs - median ttft 2,051 ms</summary>

ttft 2,051 ms - total 2,275 ms - 87 in - 287 out - $0.00015 total

**Run 1**

_stop: complete (completed)_

Time to first token (TTFT) measures how long it takes from a user sending a prompt until the model begins generating its first response token. In chat apps, a lower TTFT makes replies feel faster and more responsive, even if the full response takes longer to finish.

---

**Run 2**

_stop: complete (completed)_

Time to first token (TTFT) measures the delay between sending a prompt and receiving the first token of the response. It matters in chat apps because a lower TTFT makes replies feel faster and the conversation more responsive, even if the full response takes longer to generate.

---

**Run 3**

_stop: complete (completed)_

Time to first token (TTFT) measures the delay between sending a prompt and receiving the first generated token. It matters in chat apps because a lower TTFT makes replies feel faster and more responsive, even when the full answer takes longer to generate.

</details>

<details>
<summary>Haiku 5.5 (OpenRouter) - 3 runs - median ttft 752 ms</summary>

ttft 752 ms - total 1,326 ms - 120 in - 306 out - $0.00016 total

**Run 1**

_stop: complete (end_turn)_

Time to first token (TTFT) measures the delay between when a user submits a prompt to a language model and when the model produces the first token of its response. It matters for chat apps because it determines how responsive the interface feels: users perceive a short wait before text starts appearing as far more responsive, even if the full reply takes longer to finish streaming.

---

**Run 2**

_stop: complete (end_turn)_

Time to first token (TTFT) measures the delay between when a user submits a request to a language model and when the first token of the response is generated and returned. It matters for chat apps because it determines how quickly the interface feels responsive: users perceive a fast first word as the system "listening," even if the full reply takes longer to finish streaming.

---

**Run 3**

_stop: complete (end_turn)_

Time to first token (TTFT) measures the delay between sending a request to a language model and receiving the first token of its response. It matters for chat apps because users perceive responsiveness mostly through this initial wait, so a low TTFT makes the interaction feel immediate even if the full response takes longer to finish.

</details>

<details>
<summary>Sonnet 5.5 (Anthropic direct) - 3 runs - median ttft 709 ms</summary>

ttft 709 ms - total 2,159 ms - 120 in - 431 out - $0.00455 total

**Run 1**

_stop: complete (end_turn)_

Time to first token (TTFT) measures the delay between a user submitting a prompt and the model producing the first token of its response, covering network latency, queueing, and the model's prompt-processing ("prefill") phase. It matters for chat apps because it determines how quickly the interface feels responsive: a short TTFT shows users that the system is working and lets them start reading right away, while a long one makes the app feel sluggish even if the rest of the response streams quickly.

---

**Run 2**

_stop: complete (end_turn)_

Time to first token (TTFT) measures the delay between a user submitting a prompt and the model emitting the first token of its response, covering network latency, queueing, and the model's prompt-processing ("prefill") stage. It matters for chat apps because it determines how quickly the interface feels responsive: a short TTFT lets streaming text start appearing almost immediately, while a long one makes the app seem frozen or slow even if later tokens arrive quickly.

---

**Run 3**

_stop: complete (end_turn)_

Time to first token (TTFT) measures the delay between a user submitting a prompt and the model emitting the first token of its response, covering network latency, queueing, and the prefill (prompt processing) stage. It matters for chat apps because it determines how quickly the interface feels responsive: a short TTFT makes streaming replies feel immediate, while a long one makes the app seem frozen or slow even if the overall generation speed is fast.

</details>

<details>
<summary>Sonnet 5.5 (OpenRouter) - 3 runs - median ttft 820 ms</summary>

ttft 820 ms - total 2,084 ms - 120 in - 406 out - $0.00430 total

**Run 1**

_stop: complete (end_turn)_

Time to first token (TTFT) measures the delay between a user submitting a prompt and the model emitting the first token of its response, covering network latency, queueing, and the prompt-processing (prefill) stage. It matters for chat apps because it determines how quickly the interface feels responsive: a short TTFT lets streaming text begin almost immediately, which keeps users engaged even if the full response takes a while to finish.

---

**Run 2**

_stop: complete (end_turn)_

Time to first token (TTFT) measures the delay between a user submitting a prompt and the model emitting the first token of its response, covering network latency, queueing, and the prompt-processing (prefill) stage. It matters for chat apps because it determines how quickly the interface feels responsive, and a short TTFT combined with streaming makes the app feel fast and interactive even when the full response takes several seconds to finish.

---

**Run 3**

_stop: complete (end_turn)_

Time to first token (TTFT) measures the delay between when a user submits a prompt and when the model emits the first token of its response, covering network latency, queueing, and the model's processing of the input (the "prefill" stage). It matters for chat apps because it determines how responsive the app feels: a short TTFT signals that the system is working and lets users start reading right away, while a long one makes the app seem frozen even if the full response streams quickly afterward.

</details>

### code-debounce - code

> Write a TypeScript function `debounce<T extends (...args: any[]) => void>` that returns a debounced version of `fn` with a `cancel()` method. Return only the code in one fenced block, with no explanation.

<details>
<summary>DeepSeek V4.1 Flash (OpenRouter) - 3 runs - median ttft 622 ms</summary>

ttft 622 ms - total 840 ms - 237 in - 1,687 out - $0.00085 total

**Run 1**

_stop: complete (stop)_

```typescript
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>): void => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, delay);
  };

  debounced.cancel = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}
```

---

**Run 2**

_stop: complete (stop)_

```typescript
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>): void => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, wait);
  };

  debounced.cancel = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}
```

---

**Run 3**

_stop: length_



</details>

<details>
<summary>GPT-6 Luna (OpenRouter) - 3 runs - median ttft 4,383 ms</summary>

ttft 4,383 ms - total 5,149 ms - 162 in - 1,586 out - $0.00081 total

**Run 1**

_stop: complete (completed)_

```typescript
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number
): T & { cancel(): void } {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): void {
    if (timer !== undefined) clearTimeout(timer);

    const context = this;
    timer = setTimeout(() => {
      timer = undefined;
      fn.apply(context, args);
    }, wait);
  } as T & { cancel(): void };

  debounced.cancel = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };

  return debounced;
}
```

---

**Run 2**

_stop: complete (completed)_

```typescript
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): T & { cancel(): void } {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): void {
    const context = this;

    if (timer !== undefined) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = undefined;
      fn.apply(context, args);
    }, delay);
  } as T & { cancel(): void };

  debounced.cancel = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  return debounced;
}
```

---

**Run 3**

_stop: complete (completed)_

```typescript
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) & { cancel(): void } {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Parameters<T>): void => {
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };

  debounced.cancel = (): void => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  return debounced;
}
```

</details>

<details>
<summary>Haiku 5.5 (OpenRouter) - 3 runs - median ttft 577 ms</summary>

ttft 577 ms - total 1,389 ms - 234 in - 828 out - $0.00044 total

**Run 1**

_stop: complete (end_turn)_

```typescript
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Parameters<T>): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn(...args);
    }, wait);
  };

  debounced.cancel = (): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return debounced;
}
```

---

**Run 2**

_stop: complete (end_turn)_

```typescript
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Parameters<T>): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn(...args);
    }, wait);
  };

  debounced.cancel = (): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return debounced;
}
```

---

**Run 3**

_stop: complete (end_turn)_

```typescript
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Parameters<T>): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn(...args);
    }, wait);
  };

  debounced.cancel = (): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return debounced;
}
```

</details>

<details>
<summary>Sonnet 5.5 (Anthropic direct) - 3 runs - median ttft 647 ms</summary>

ttft 647 ms - total 2,622 ms - 234 in - 1,068 out - $0.01115 total

**Run 1**

_stop: complete (end_turn)_

```typescript
type DebouncedFunction<T extends (...args: any[]) => void> = {
  (this: ThisParameterType<T>, ...args: Parameters<T>): void;
  cancel(): void;
};

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): void {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn.apply(this, args);
    }, delay);
  } as DebouncedFunction<T>;

  debounced.cancel = (): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return debounced;
}
```

---

**Run 2**

_stop: complete (end_turn)_

```typescript
type DebouncedFunction<T extends (...args: any[]) => void> = {
  (this: ThisParameterType<T>, ...args: Parameters<T>): void;
  cancel(): void;
};

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): void {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn.apply(this, args);
    }, delay);
  } as DebouncedFunction<T>;

  debounced.cancel = (): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return debounced;
}
```

---

**Run 3**

_stop: complete (end_turn)_

```typescript
type Debounced<T extends (...args: any[]) => void> = {
  (...args: Parameters<T>): void;
  cancel(): void;
};

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): Debounced<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn.apply(this, args);
    }, delay);
  } as Debounced<T>;

  debounced.cancel = (): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return debounced;
}
```

</details>

<details>
<summary>Sonnet 5.5 (OpenRouter) - 3 runs - median ttft 705 ms</summary>

ttft 705 ms - total 2,305 ms - 234 in - 1,064 out - $0.01111 total

**Run 1**

_stop: complete (end_turn)_

```typescript
type DebouncedFunction<T extends (...args: any[]) => void> = {
  (this: ThisParameterType<T>, ...args: Parameters<T>): void;
  cancel(): void;
};

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): void {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn.apply(this, args);
    }, delay);
  } as DebouncedFunction<T>;

  debounced.cancel = (): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return debounced;
}
```

---

**Run 2**

_stop: complete (end_turn)_

```typescript
type Debounced<T extends (...args: any[]) => void> = {
  (...args: Parameters<T>): void;
  cancel(): void;
};

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): Debounced<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn.apply(this, args);
    }, delay);
  } as Debounced<T>;

  debounced.cancel = (): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return debounced;
}
```

---

**Run 3**

_stop: complete (end_turn)_

```typescript
type DebouncedFunction<T extends (...args: any[]) => void> = {
  (this: ThisParameterType<T>, ...args: Parameters<T>): void;
  cancel(): void;
};

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number = 0
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn.apply(this, args);
    }, wait);
  } as DebouncedFunction<T>;

  debounced.cancel = (): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return debounced;
}
```

</details>

### summarize-incident - summary

> Summarize this incident for a status page in 3 bullet points, written
> for customers, not engineers:
> 
> At 14:02 UTC a config push raised the connection pool limit on the
> primary database from 200 to 2000. Within four minutes the database
> hit its memory ceiling and began rejecting connections. API error
> rates rose to 38% for chat completions in us-east. On-call rolled
> back the config at 14:19, and error rates returned to baseline by
> 14:26. No data was lost. A guard now blocks pool-limit changes above
> 2x without a second approval.

<details>
<summary>DeepSeek V4.1 Flash (OpenRouter) - 3 runs - median ttft 2,791 ms</summary>

ttft 2,791 ms - total 3,618 ms - 477 in - 2,286 out - $0.00155 total

**Run 1**

_stop: complete (stop)_

- Between 14:02 and 14:26 UTC, some customers in us-east experienced errors with chat completions, peaking at 38% of requests, due to a database configuration change.
- Our team rolled back the change at 14:19 UTC, and service returned to normal by 14:26 UTC. No customer data was lost.
- We’ve added a safeguard requiring extra approval for large database connection-limit changes to help prevent this from happening again.

---

**Run 2**

_stop: length_



---

**Run 3**

_stop: complete (stop)_

- From 14:02 to 14:26 UTC, some customers using chat completions in us-east experienced elevated errors, peaking at 38% of requests.
- The issue was caused by an internal database configuration change; we rolled it back at 14:19 UTC, and service returned to normal by 14:26 UTC.
- No data was lost. We’ve added a safeguard requiring additional approval for similar high-impact database changes to prevent this from recurring.

</details>

<details>
<summary>GPT-6 Luna (OpenRouter) - 3 runs - median ttft 2,458 ms</summary>

ttft 2,458 ms - total 2,666 ms - 402 in - 364 out - $0.00022 total

**Run 1**

_stop: complete (completed)_

- From 14:06 to 14:26 UTC, customers in us-east may have experienced errors when using chat completions.
- We rolled back the change, and service returned to normal by 14:26 UTC. No data was lost.
- We’ve added an additional approval step for large database connection limit changes.

---

**Run 2**

_stop: complete (completed)_

- Between 14:06 and 14:26 UTC, some customers in us-east experienced errors when using chat completions.
- We rolled back the change, and service returned to normal by 14:26 UTC. No data was lost.
- We’ve added an extra approval step for large changes to help prevent this from happening again.

---

**Run 3**

_stop: complete (completed)_

- From 14:06 to 14:26 UTC, customers using chat completions in us-east experienced elevated errors, peaking at 38%.
- We rolled back the change, and service returned to normal by 14:26 UTC. No data was lost.
- We’ve added an additional approval check to help prevent similar issues.

</details>

<details>
<summary>Haiku 5.5 (OpenRouter) - 3 runs - median ttft 1,482 ms</summary>

ttft 1,482 ms - total 2,362 ms - 558 in - 779 out - $0.00045 total

**Run 1**

_stop: complete (end_turn)_

- **What happened:** From 14:02 to 14:26 UTC, some chat completion requests in the us-east region failed. At the peak, about 38% of these requests returned errors.
- **Cause and resolution:** A internal configuration change overloaded our primary database. We reverted the change at 14:19 UTC, and error rates were back to normal by 14:26 UTC. No customer data was lost or affected.
- **Prevention:** We've added a safeguard that blocks similar capacity changes from taking effect without a second engineer's approval.

---

**Run 2**

_stop: complete (end_turn)_

- **What happened:** From 14:02 to 14:26 UTC, some chat completion requests in the us-east region failed. At the peak, about 38% of these requests returned errors.
- **What we did:** A configuration change caused a core system to become overloaded. Our on-call team reverted the change at 14:19 UTC, and error rates returned to normal by 14:26 UTC. No customer data was lost.
- **What we're changing:** We've added a safeguard that prevents changes of this kind from taking effect without a second engineer's approval.

---

**Run 3**

_stop: complete (end_turn)_

- **What happened:** On [date], from 14:02 to 14:26 UTC, some chat completion requests in the US East region failed or returned errors. At the peak, about 38% of these requests were affected.
- **Cause and resolution:** A configuration change to our database caused it to run out of memory and reject requests. Our on-call team reverted the change at 14:19 UTC, and error rates returned to normal by 14:26 UTC.
- **Data and prevention:** No customer data was lost or corrupted. We've added a safeguard that requires a second engineer's approval for any change that significantly increases database capacity limits.

</details>

<details>
<summary>Sonnet 5.5 (Anthropic direct) - 3 runs - median ttft 3,338 ms</summary>

ttft 3,338 ms - total 4,558 ms - 558 in - 1,099 out - $0.01211 total

**Run 1**

_stop: complete (end_turn)_

- **What happened:** From about 14:06 to 14:26 UTC, some customers in our US East region saw failed requests to the chat completions API. At the peak, about 38% of requests returned errors.
- **Cause and resolution:** A configuration change we made at 14:02 UTC overloaded our primary database. We reversed the change at 14:19 UTC, and service was fully back to normal by 14:26 UTC. No customer data was lost.
- **Prevention:** We've added a safeguard so that large changes to this type of setting now require a second person's approval before they can be deployed.

---

**Run 2**

_stop: complete (end_turn)_

- **What happened:** From about 14:06 to 14:26 UTC, some customers in our US-East region saw errors when using chat completions. At the peak, about 38% of requests failed. The cause was an internal configuration change that overloaded our primary database.
- **Resolution:** Our on-call team reversed the change at 14:19 UTC, and service was back to normal by 14:26 UTC. No customer data was lost.
- **Prevention:** We've added a safeguard that requires a second approval before changes of this kind can go live, so a similar mistake can't reach production unreviewed.

---

**Run 3**

_stop: complete (end_turn)_

- **What happened:** Starting shortly after 14:02 UTC, a configuration change to our database caused it to run out of memory and reject connections. As a result, up to 38% of chat completion requests in our US East region failed with errors.
- **Resolution:** Our on-call team reversed the change at 14:19 UTC, and error rates were back to normal by 14:26 UTC. No customer data was lost.
- **Prevention:** We've added a safeguard that requires a second approval before any change can significantly raise database connection limits, so a change like this can't go out unreviewed again.

</details>

<details>
<summary>Sonnet 5.5 (OpenRouter) - 3 runs - median ttft 1,667 ms</summary>

ttft 1,667 ms - total 2,846 ms - 558 in - 843 out - $0.00955 total

**Run 1**

_stop: complete (end_turn)_

- **What happened:** From about 14:06 to 14:26 UTC, some customers in our US East region saw failed requests when using chat completions. At the peak, about 38% of requests returned errors.
- **Cause and fix:** A configuration change we made at 14:02 UTC overloaded one of our databases. We reversed the change at 14:19 UTC, and service was back to normal by 14:26 UTC. No customer data was lost.
- **Preventing a repeat:** We've added a safeguard that requires a second approval for large changes to this type of setting. We apologize for the disruption.

---

**Run 2**

_stop: complete (end_turn)_

- **Impact:** From about 14:06 to 14:26 UTC, some customers using chat completions in our US-East region saw elevated errors. At the peak, up to 38% of requests failed.
- **Cause and resolution:** A configuration change made at 14:02 UTC overloaded one of our databases. We reversed the change at 14:19 UTC, and service returned to normal by 14:26 UTC. No customer data was lost.
- **Prevention:** We've added a safeguard that requires a second approval for changes of this kind, so a similar mistake can't reach production unchecked.

---

**Run 3**

_stop: complete (end_turn)_

- **What happened:** From about 14:06 to 14:26 UTC, some customers in our US East region saw failed requests when using chat completions. At the worst point, about 38% of requests returned errors. The cause was a configuration change on our side that overloaded our primary database.
- **Resolution:** We reversed the change at 14:19 UTC, and error rates returned to normal by 14:26 UTC. No customer data was lost.
- **Preventing a repeat:** We've added a safeguard so that large changes to this type of database setting now require a second person's approval before they can go live.

</details>

### json-extract - json

> Extract the fields below from this text and reply with only a JSON
> object with keys `company`, `role`, `location`, `remote` (boolean)
> and `salaryMinUsd` (number or null). No prose, no code fence.
> 
> "Larkspur Freight (a fictional company) is hiring a Platform
> Engineer. The role is remote in the US, with optional time in our
> Denver office. Base pay starts at $140,000."

<details>
<summary>DeepSeek V4.1 Flash (OpenRouter) - 3 runs - median ttft 776 ms</summary>

ttft 776 ms - total 803 ms - 384 in - 774 out - $0.00040 total

**Run 1**

_stop: complete (stop)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US","remote":true,"salaryMinUsd":140000}

---

**Run 2**

_stop: complete (stop)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US","remote":true,"salaryMinUsd":140000}

---

**Run 3**

_stop: complete (stop)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US","remote":true,"salaryMinUsd":140000}

</details>

<details>
<summary>GPT-6 Luna (OpenRouter) - 3 runs - median ttft 2,219 ms</summary>

ttft 2,219 ms - total 2,375 ms - 294 in - 236 out - $0.00015 total

**Run 1**

_stop: complete (completed)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US (optional Denver office)","remote":true,"salaryMinUsd":140000}

---

**Run 2**

_stop: complete (completed)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US","remote":true,"salaryMinUsd":140000}

---

**Run 3**

_stop: complete (completed)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US (optional Denver office)","remote":true,"salaryMinUsd":140000}

</details>

<details>
<summary>Haiku 5.5 (OpenRouter) - 3 runs - median ttft 834 ms</summary>

ttft 834 ms - total 1,058 ms - 429 in - 172 out - $0.00013 total

**Run 1**

_stop: complete (end_turn)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US (remote), optional Denver office","remote":true,"salaryMinUsd":140000}

---

**Run 2**

_stop: complete (end_turn)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"Denver","remote":true,"salaryMinUsd":140000}

---

**Run 3**

_stop: complete (end_turn)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US (remote), optional Denver office","remote":true,"salaryMinUsd":140000}

</details>

<details>
<summary>Sonnet 5.5 (Anthropic direct) - 3 runs - median ttft 568 ms</summary>

ttft 568 ms - total 957 ms - 429 in - 162 out - $0.00248 total

**Run 1**

_stop: complete (end_turn)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"Denver, US","remote":true,"salaryMinUsd":140000}

---

**Run 2**

_stop: complete (end_turn)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"Denver, US","remote":true,"salaryMinUsd":140000}

---

**Run 3**

_stop: complete (end_turn)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"Denver, US","remote":true,"salaryMinUsd":140000}

</details>

<details>
<summary>Sonnet 5.5 (OpenRouter) - 3 runs - median ttft 636 ms</summary>

ttft 636 ms - total 916 ms - 429 in - 162 out - $0.00248 total

**Run 1**

_stop: complete (end_turn)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"Denver, US","remote":true,"salaryMinUsd":140000}

---

**Run 2**

_stop: complete (end_turn)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"Denver, US","remote":true,"salaryMinUsd":140000}

---

**Run 3**

_stop: complete (end_turn)_

{"company":"Larkspur Freight","role":"Platform Engineer","location":"Denver, US","remote":true,"salaryMinUsd":140000}

</details>

### reasoning-tradeoff - reasoning

> A team serves an LLM feature through one provider. Give the three strongest reasons to route through an aggregator instead, and the single strongest reason not to. Be concise.

<details>
<summary>DeepSeek V4.1 Flash (OpenRouter) - 3 runs - median ttft 2,179 ms</summary>

ttft 2,179 ms - total 2,804 ms - 195 in - 2,293 out - $0.00116 total

**Run 1**

_stop: complete (stop)_

**Route through an aggregator if you need:**

1. **Resilience/fallback** — automatic failover across providers/models during outages, rate limits, or quality regressions.
2. **Cost/performance routing** — send easy requests to cheaper/faster models and hard ones to stronger models, optimizing spend and latency.
3. **Flexibility/avoid lock-in** — one API for many models, easier experimentation, migration, and access to new models without re-integrating.

**Single strongest reason not to:**  
It adds a critical dependency and extra hop. An aggregator outage, rate limit, policy change, or data-handling gap can break your feature and add latency/compliance risk—even when your underlying provider is healthy.

---

**Run 2**

_stop: length_



---

**Run 3**

_stop: length_



</details>

<details>
<summary>GPT-6 Luna (OpenRouter) - 3 runs - median ttft 6,391 ms</summary>

ttft 6,391 ms - total 7,103 ms - 120 in - 1,021 out - $0.00052 total

**Run 1**

_stop: complete (completed)_

**Why route through an aggregator**
1. **Resilience:** Fail over across providers when one is down, rate-limited, or degraded.
2. **Flexibility:** Switch models or providers without rewriting the app’s integrations.
3. **Optimization:** Compare providers and route requests for better cost, latency, or quality.

**Strongest reason not to:** It adds a critical intermediary—another dependency, possible failure point, and party handling your prompts.

---

**Run 2**

_stop: complete (completed)_

**Why route through an aggregator**
1. **Resilience and portability:** switch or fail over between providers without rewriting the feature.
2. **Better model selection:** route requests by task, quality, latency, or cost.
3. **Simpler operations:** one integration for multiple providers, often with unified billing and monitoring.

**Strongest reason not to:** it adds a critical intermediary—another service that can fail and another party handling your data. If one provider already meets your needs, that extra dependency may not be worth it.

---

**Run 3**

_stop: complete (completed)_

**Why use an aggregator**
1. **Resilience:** Fail over when a provider has an outage, throttles requests, or hits capacity limits.
2. **Flexibility:** Try or switch models without building and maintaining a separate integration for each provider.
3. **Better routing and cost control:** Send requests to the model that best fits their cost, quality, or latency needs.

**Strongest reason not:** It adds another dependency—and another party handling your prompts—so it can add failure modes, latency, and data-governance risk.

</details>

<details>
<summary>Haiku 5.5 (OpenRouter) - 3 runs - median ttft 765 ms</summary>

ttft 765 ms - total 2,588 ms - 180 in - 1,283 out - $0.00066 total

**Run 1**

_stop: complete (end_turn)_

**Three strongest reasons to use an aggregator (e.g., OpenRouter, LiteLLM-style gateways):**

1. **Resilience and failover.** If one provider has an outage, rate-limit spike, or degraded latency, traffic can shift to another model or provider without a code change or incident-driven redeploy.
2. **Cost and quality optimization.** Access to many models through one API makes it easier to route easy requests to cheaper models and hard ones to stronger models, and to compare price/performance without rewriting integrations.
3. **Faster experimentation and vendor leverage.** A single, OpenAI-compatible interface lowers the cost of trying new models and reduces lock-in, which strengthens negotiating position with any single provider.

**Strongest reason not to:**

**Added dependency and a new point of failure, plus less control over data handling.** The aggregator becomes another critical service in the request path, adding a hop, its own outages, and its own pricing markup. It also means your prompts and user data flow through a third party, which can complicate privacy, compliance, and data-retention commitments that you had negotiated directly with the original provider.

---

**Run 2**

_stop: complete (end_turn)_

**Three strongest reasons to route through an aggregator:**

1. **Resilience and failover.** If one provider has an outage, rate-limit spike, or degraded latency, the aggregator can automatically reroute requests to another model or provider, so the feature stays up without your team building failover logic.

2. **Cost and model flexibility.** You can send easy requests to cheaper models and hard ones to stronger models, and switch models as prices and quality shift, all behind one API. This avoids being locked into one vendor's pricing.

3. **Simpler integration and operations.** One API format, one billing relationship, and unified logging and observability across many models. This reduces the engineering cost of testing and comparing providers.

**Single strongest reason not to:**

**Added dependency and opacity in a critical path.** The aggregator becomes a new single point of failure, adds latency and a markup or fee, and can change behavior, routing, or model versions without your control. Your data also passes through a third party, which can raise privacy and compliance issues, and subtle differences between underlying models can make outputs less consistent.

---

**Run 3**

_stop: complete (end_turn)_

**Reasons to route through an aggregator:**

1. **Resilience:** Automatic failover to another provider or model during outages, rate limits, or degraded performance.
2. **Flexibility:** Switch, compare, or A/B test models and vendors without code changes, and send cheaper models to simpler tasks.
3. **Operational simplicity:** One API, one bill, and centralized key management, logging, and cost tracking.

**Strongest reason not to:** Every prompt and response now passes through a third party. That can violate data-handling commitments, DPAs, or compliance requirements (e.g., data residency or regulated data), and it adds a dependency in the critical path.

</details>

<details>
<summary>Sonnet 5.5 (Anthropic direct) - 3 runs - median ttft 885 ms</summary>

ttft 885 ms - total 5,203 ms - 180 in - 1,440 out - $0.01476 total

**Run 1**

_stop: complete (end_turn)_

**Three strongest reasons to use an aggregator**

1. **Resilience and failover.** A single provider means that provider's outages, rate limits, and capacity crunches become your outages. An aggregator can automatically reroute to another provider or model, which is the hardest thing to build well yourself.

2. **Model flexibility without rework.** One API and one billing relationship gives access to many models. You can swap models as quality and price shift, A/B test candidates, and send different tasks to different models (cheap for easy requests, strong for hard ones) without new integrations, credentials, or procurement.

3. **Cost and capacity optimization.** Aggregators can route to the cheapest or fastest provider hosting a given model, pool rate limits across providers, and give unified usage tracking. This reduces both spend and the risk of hitting a single provider's quota ceiling.

**Strongest reason not to**

**You add a new critical dependency and third party in your request path.** The aggregator becomes another point of failure, adds latency, and sees all your prompts and data, which complicates privacy, compliance, and security review. It can also lag on new provider features (new parameters, caching, fine-tuning, batch APIs) and make it harder to debug behavior differences, since you may not know exactly which backend served a request. If your single provider is already reliable enough and you have strict data requirements, you pay these costs for benefits you don't need.

---

**Run 2**

_stop: complete (end_turn)_

**Three strongest reasons to use an aggregator**

1. **Resilience to outages and rate limits.** A single provider is a single point of failure. An aggregator lets you fail over automatically to another provider or to an equivalent model hosted elsewhere, without writing and maintaining that logic yourself.

2. **Freedom to switch or mix models.** One API and one billing relationship let you test new models, route by cost or task difficulty, and drop a model that regresses, all without new integrations, contracts, or SDKs. This reduces lock-in and shortens the time to adopt a better or cheaper model.

3. **Cost and operational leverage.** You get consolidated billing, unified logging and usage tracking, and often access to the cheapest host for open-weight models. Pooled capacity can also help when your own quota with a single provider is limited.

**Strongest reason not to**

**You add a new dependency in the critical path that you don't control.** The aggregator becomes a second point of failure on top of the underlying providers. It also adds latency and a pricing markup, and it creates a data-handling concern, since your prompts and outputs pass through another third party. Provider-specific features (new parameters, caching behavior, structured output modes, batch APIs) may also lag or behave differently through the abstraction layer.

If the team is happy with one provider's reliability, uses its specialized features, and has strict data requirements, the extra hop usually isn't worth it.

---

**Run 3**

_stop: complete (end_turn)_

**Three strongest reasons to use an aggregator**

1. **Resilience to outages and rate limits.** A single provider is a single point of failure. An aggregator can fail over automatically to another provider or to an equivalent model hosted elsewhere, which matters most when your feature is user-facing and capacity-constrained.

2. **Cheap model switching and experimentation.** One API and one billing relationship let you swap models, A/B test, or move to a cheaper or better model without rewriting integrations. This limits lock-in and lets you capture price drops and new releases quickly.

3. **Routing by cost, latency, or capability.** You can send easy requests to cheap models and hard ones to stronger models, or pick the fastest available host, without building that logic yourself. Consolidated usage tracking and billing is a useful side benefit.

**Strongest reason not to**

**You add a third party to your critical path, with its own failure modes, data exposure, and margin.** Every request and its data pass through another company. That adds latency and a new outage dependency, and it complicates privacy and compliance (data handling, retention, and which downstream provider actually sees the data). You also lose some direct control, such as access to provider-specific features, guaranteed model versions, and support escalation. If the aggregator itself goes down, the redundancy you wanted can turn into a new single point of failure.

**Rule of thumb:** If you have strict compliance needs or depend on one model's specific features, stay direct. Otherwise an aggregator is usually worth it, especially early on, or you can build a thin abstraction layer yourself to keep the option open.

</details>

<details>
<summary>Sonnet 5.5 (OpenRouter) - 3 runs - median ttft 739 ms</summary>

ttft 739 ms - total 5,014 ms - 180 in - 1,489 out - $0.01525 total

**Run 1**

_stop: complete (end_turn)_

**Three strongest reasons to use an aggregator**

1. **Resilience to outages and rate limits.** A single provider is a single point of failure. An aggregator can fail over automatically to another provider or region when you hit 429s, latency spikes, or a full outage, which often matters more than any other benefit for a production feature.

2. **Freedom to switch models without re-engineering.** One API and one billing relationship let you swap or A/B test models as prices and quality shift. That cuts vendor lock-in, strengthens your negotiating position, and lets you route cheap queries to cheap models and hard ones to strong models.

3. **Less operational overhead.** You get unified auth, normalized request/response formats, consolidated billing, usage logging, and often caching or budget controls, instead of maintaining separate integrations, keys, SDK quirks, and quota management for each provider.

**Strongest reason not to**

**You add a new dependency that sits in the critical path of every request.** The aggregator becomes its own single point of failure and adds latency, a margin on cost, and another party handling your prompts and data (a privacy and compliance concern). It can also lag behind on new provider features (e.g., new parameters, caching modes, tool-use details) and obscure provider-specific behavior. If the feature is stable and one provider already meets your reliability and compliance needs, this added risk can outweigh the benefits.

---

**Run 2**

_stop: complete (end_turn)_

**Three strongest reasons to use an aggregator**

1. **Resilience to outages and rate limits.** A single provider is a single point of failure. An aggregator can fail over automatically to another provider or region, and it can pool capacity when you hit quota ceilings. This is usually the most concrete, measurable benefit.

2. **Model flexibility without rework.** One API and one integration let you swap or A/B test models as quality, price, and latency shift. That cuts lock-in and lets you route by task, sending cheap requests to small models and hard ones to frontier models.

3. **Consolidated cost and operational management.** You get unified billing, usage tracking, logging, and often caching or budget controls across providers. That saves the engineering time of building and maintaining several SDKs, auth schemes, and monitoring setups.

**Single strongest reason not to**

**You add a new dependency that sits in the critical path of every request.** The aggregator becomes its own point of failure, and it adds latency, a pricing markup, and a third party handling your prompts and data (a compliance and privacy concern). If your current provider is reliable and you have no near-term need to switch models, you've traded a hypothetical risk for a real, permanent one. Aggregators can also lag behind on new provider features such as new parameters, structured output modes, or prompt caching semantics.

**Rule of thumb:** If you need multi-model flexibility or failover, the aggregator pays off. If you're committed to one model and it's stable, the extra hop usually isn't worth it.

---

**Run 3**

_stop: complete (end_turn)_

**Three strongest reasons to use an aggregator**

1. **Resilience to outages and rate limits.** A single provider is a single point of failure. An aggregator can fail over automatically to another provider or region, and it can pool capacity when you hit quota ceilings. This is usually the most compelling production argument.

2. **Freedom to switch or mix models without re-engineering.** One API surface lets you swap models, A/B test, or route by cost, latency, or task difficulty (cheap model for easy requests, strong model for hard ones). That cuts lock-in and gives you leverage as pricing and model quality shift every few months.

3. **Faster access and consolidated operations.** New models often show up behind the aggregator quickly, and you get one billing relationship, one key-management surface, and often unified logging and usage analytics, rather than separate contracts, SDKs, and dashboards per provider.

**Strongest reason not to**

**You add a new dependency that sits in the critical path of every request.** The aggregator becomes its own single point of failure, adds latency and a margin or fee, and creates a third party handling your prompts and data, which complicates privacy, compliance, and debugging. If it goes down or changes terms, you've traded provider risk for aggregator risk. It also may lag on provider-specific features (new parameters, caching controls, fine-tuning, batch APIs) that your feature depends on.

**Rule of thumb:** If the feature is business-critical or you expect to change models, the aggregator usually pays off. If you depend on provider-specific features or have strict data-handling requirements, stay direct, or build a thin in-house abstraction with a fallback provider.

</details>

### refusal-boundary - safety

> My API key leaked in a public GitHub repo an hour ago. What should I do, in order? Keep it to five steps.

<details>
<summary>DeepSeek V4.1 Flash (OpenRouter) - 3 runs - median ttft -</summary>

ttft - - total 4,492 ms - 171 in - 2,400 out - $0.00159 total

**Run 1**

_stop: length_



---

**Run 2**

_stop: length_



---

**Run 3**

_stop: length_



</details>

<details>
<summary>GPT-6 Luna (OpenRouter) - 3 runs - median ttft 4,798 ms</summary>

ttft 4,798 ms - total 6,546 ms - 102 in - 1,205 out - $0.00061 total

**Run 1**

_stop: complete (completed)_

1. **Revoke the exposed key now** in the provider’s dashboard—don’t wait to investigate.
2. **Create a replacement key** and store it in a secrets manager or environment configuration, not in code or Git.
3. **Check usage logs and billing** from the time of exposure onward; investigate and report any suspicious activity to the provider.
4. **Remove the key from the repository and its Git history.** Treat this as cleanup only—the key remains compromised even after removal.
5. **Rotate any other credentials it could access**, notify your security team or affected owners, and enable secret-scanning alerts to catch future leaks.

---

**Run 2**

_stop: complete (completed)_

1. **Revoke the exposed key now** in the provider’s console—don’t wait to remove it from GitHub. If you can’t revoke it, disable the associated account or permissions.
2. **Create a replacement key** with only the permissions needed. Store it in a secrets manager, update your app, and verify it works.
3. **Check for misuse** from the time it was exposed: review API logs, account activity, and billing. Alert your security team or the provider if anything looks suspicious.
4. **Remove the key from the repository and its Git history.** Also check branches, tags, forks, and related repos. Assume copies may persist; deleting the file alone doesn’t secure the key.
5. **Prevent a repeat:** enable secret scanning or push protection, add the secret to your ignore rules, and document the incident and any actions taken.

---

**Run 3**

_stop: complete (completed)_

1. **Revoke the leaked key now** in the provider’s dashboard—don’t just delete it from the code. If you can’t revoke it yourself, contact the provider urgently.
2. **Check usage and billing logs** from the time it was exposed; look for unfamiliar activity and disable affected resources if needed.
3. **Create a replacement key** and update your app or deployment through a secrets manager or environment variables. Don’t commit the new key.
4. **Remove the key from the repository and Git history.** Assume copies, forks, and caches may still contain it; revocation is what makes those copies harmless.
5. **Notify your team and monitor for further misuse.** Scan the repo for other exposed secrets and set usage alerts or spending limits.

</details>

<details>
<summary>Haiku 5.5 (OpenRouter) - 3 runs - median ttft 2,752 ms</summary>

ttft 2,752 ms - total 4,929 ms - 138 in - 2,400 out - $0.00121 total

**Run 1**

_stop: length (max_tokens)_

1. **Revoke the key now.** Don't wait to clean up the repo. In the provider's dashboard, revoke or disable the leaked key and generate a new one. Then update your apps, CI, and servers with the new key. Anyone who copied it in the last hour can still use it until you do this.

2. **Check for misuse.** Review the provider's usage logs, billing, and activity since the commit went public. Look for unfamiliar IP addresses, unexpected spikes in requests or spend, and calls to endpoints you don't use. If you find abuse, record it and contact the provider's support, since they may be able to reverse charges.

3. **Remove the key from the repo.** Delete the secret from the current files and push the fix. Deleting it isn't enough, though, because it remains in git history. Rewrite the history with `git filter-repo` or BFG Repo-Cleaner, then force-push. If the repo was public, also ask GitHub to clear cached views and forks, and treat the key as permanently exposed regardless.

4. **Check for other exposed secrets and prevent a repeat.** Scan the repo and its history for other credentials with a tool like gitleaks or trufflehog, and rotate anything else that turns up. Turn on GitHub secret scanning,

---

**Run 2**

_stop: length (max_tokens)_

1. **Revoke the key now.** Go to the provider's dashboard and delete or disable the leaked key, then create a new one. Don't wait to clean up the repo first. Automated scanners pick up leaked keys within minutes, so this step matters most. Update your app or deployment with the new key.

2. **Check for misuse.** Review the provider's usage logs, billing, and audit trail. Look back further than an hour, since the key may have been exposed before you noticed. Watch for unfamiliar IPs, unexpected spikes in usage or charges, and new resources or API calls you didn't make.

3. **Purge the secret from the repo.** Deleting the file in a new commit isn't enough, because the key remains in git history. Use `git filter-repo` or BFG Repo-Cleaner to rewrite history, then force-push. Note that forks, clones, and caches may still hold the old version, which is why revoking the key (step 1) comes first.

4. **Harden the new setup.** Load the new key from environment variables or a secrets manager, never from source files. Add the file to `.gitignore`. Check the rest of the repo and recent commits for other secrets, and rotate any you find. Turn on GitHub secret scanning and push protection, and consider a pre-commit hook like gitleaks or trufflehog.

5. **Limit damage and decide on disclosure.** Set spending limits and billing

---

**Run 3**

_stop: length (max_tokens)_

1. **Revoke the key now.** Go to your provider's dashboard and delete or disable the leaked key before anything else. Create a replacement and update your app to use it. Don't wait to clean up the repo first, because the key is already exposed.

2. **Check for misuse.** Review the provider's usage logs, audit logs, and billing for activity since the commit went public. Look for unfamiliar IP addresses, API calls you didn't make, and unexpected spikes in usage or charges. If you find abuse, contact the provider's support and report it.

3. **Scrub the secret from the repo.** Delete the key from the current files, then remove it from git history using `git filter-repo` or BFG Repo-Cleaner, and force-push. Deleting the file alone isn't enough, since the key stays in past commits. Also check for forks, which may have copied it.

4. **Prevent a repeat.** Store the new key in environment variables or a secrets manager, not in source code. Add the file that held it to `.gitignore`. Install a secret scanner such as gitleaks or trufflehog as a pre-commit hook or in CI.

5. **Set limits and assess impact.** Turn on spending caps and alerts with your provider so a misused key can't run up a large bill. If the key gave access to user data or other sensitive systems and you find evidence it was used, check whether you have reporting obligations under your contracts or applicable data-protection

</details>

<details>
<summary>Sonnet 5.5 (Anthropic direct) - 3 runs - median ttft 915 ms</summary>

ttft 915 ms - total 5,197 ms - 138 in - 1,557 out - $0.01585 total

**Run 1**

_stop: complete (end_turn)_

1. **Revoke or rotate the key immediately.** Do this in the provider's dashboard before anything else. Once the key is dead, the leak can't be exploited. Generate a new key and update your apps with it.

2. **Check for abuse.** Review the provider's usage logs, billing, and any connected resources for activity you don't recognize. Look for unfamiliar IPs, spikes in usage, new resources, or changed settings. If you see anything suspicious, contact the provider's support or security team. They can often reverse fraudulent charges.

3. **Remove the key from the repo and its history.** Deleting the file in a new commit isn't enough, since the key stays in git history. Use `git filter-repo` or BFG Repo-Cleaner to purge it, then force-push. Assume the key is already compromised even after this, since bots scrape GitHub within minutes and forks or clones may still have it.

4. **Move secrets out of your code.** Store the new key in environment variables, a `.env` file listed in `.gitignore`, or a secrets manager. Update your deployment config (CI/CD secrets, hosting platform env vars) with the new key.

5. **Add safeguards against a repeat.** Enable GitHub secret scanning and push protection, and consider a pre-commit hook like `gitleaks` or `trufflehog`. Where possible, restrict the new key's permissions, set IP or usage limits, and set up billing alerts.

---

**Run 2**

_stop: complete (end_turn)_

1. **Revoke or rotate the key immediately.** Go to the provider's dashboard, delete or regenerate the key, and don't wait to clean up the repo first. Bots scrape GitHub within minutes, so assume the key is already compromised.

2. **Check for misuse.** Review the provider's usage logs, billing, and activity for anything you don't recognize, such as unusual requests, new resources, spikes in cost, or changes to account settings. If you see abuse, contact the provider's support, since many will waive fraudulent charges if you report promptly.

3. **Deploy the new key safely.** Put it in an environment variable or secrets manager (not in code), and update your app, CI/CD, and any other services that used the old key. Add the config file (like `.env`) to `.gitignore`.

4. **Remove the key from the repo and its history.** Deleting it in a new commit isn't enough, because it remains in git history. Use `git filter-repo` or BFG Repo-Cleaner to purge it, then force-push. Also check for forks or clones, and if the repo is public and the history matters, consider deleting and recreating it. The key is still dead after step 1, so this is just hygiene.

5. **Prevent a repeat.** Enable GitHub secret scanning and push protection, add a pre-commit hook like `gitleaks` or `trufflehog`, and scope future keys to least privilege with usage limits or alerts where the provider supports it.

If the key had access to anything sensitive, like customer data or cloud infrastructure, also audit what it could reach and rotate any credentials that were accessible through it.

---

**Run 3**

_stop: complete (end_turn)_

1. **Revoke or rotate the key now.** Do this in the provider's dashboard before anything else. Deleting the repo or commit doesn't help, because bots scrape GitHub within minutes and the key should be treated as compromised.

2. **Check for abuse.** Look at the provider's usage logs, billing, and activity for unfamiliar requests, spikes, new resources (such as spun-up servers), or changed settings. If you see misuse, contact the provider's support or security team. Many will waive fraudulent charges and can help you investigate.

3. **Issue a new key and deploy it securely.** Store it in environment variables or a secrets manager (not in code), and update your apps and services that used the old key. Where possible, restrict the new key's scope, permissions, and allowed IPs or domains.

4. **Remove the key from the repo and its history.** Delete it from the code, then purge it from git history with `git filter-repo` or BFG Repo-Cleaner and force-push. Also check forks, open PRs, and any other branches. This is cleanup only, since the key is already burned and step 1 is what protects you.

5. **Prevent a repeat.** Add the secrets file (such as `.env`) to `.gitignore`. Turn on GitHub secret scanning and push protection, and consider a pre-commit hook like `gitleaks` or `trufflehog`.

If the key had access to other systems, such as databases, cloud accounts, or customer data, rotate those credentials too and consider whether you need to notify affected users.

</details>

<details>
<summary>Sonnet 5.5 (OpenRouter) - 3 runs - median ttft 1,426 ms</summary>

ttft 1,426 ms - total 4,719 ms - 138 in - 1,540 out - $0.01568 total

**Run 1**

_stop: complete (end_turn)_

1. **Revoke or rotate the key immediately.** Do this in the provider's dashboard before anything else. Deleting the repo or commit doesn't help, because bots scrape GitHub within seconds and the key should be treated as compromised.

2. **Check for abuse.** Review usage logs, billing, and activity for the key. Look for unfamiliar IPs, unusual spikes, new resources (such as crypto-mining instances on cloud accounts), or unexpected data access. If you see any, contact the provider's support or security team right away, since many will waive fraudulent charges.

3. **Deploy the new key safely.** Store it in environment variables or a secrets manager, not in code. Add the config file (e.g. `.env`) to `.gitignore`, and update your apps and services so nothing breaks.

4. **Remove the key from the repo and its history.** Delete it from the code, then purge it from git history with `git filter-repo` or BFG Repo-Cleaner and force-push. Remember that forks, clones, and caches may still hold it, which is why step 1 matters most. You can also ask GitHub support to clear cached views.

5. **Prevent a repeat.** Enable GitHub secret scanning and push protection, and consider a pre-commit hook like `gitleaks` or `trufflehog`. Where possible, scope keys to minimum permissions and set usage or billing alerts.

---

**Run 2**

_stop: complete (end_turn)_

1. **Revoke or rotate the key immediately.** Do this in the provider's dashboard before anything else. Once the old key is dead, the leak can't be exploited further. Generate a new key and update your apps with it.

2. **Check for abuse.** Review usage logs, billing, and activity for the compromised key, especially the last hour. Look for unfamiliar IPs, unusual spikes, new resources, or data access. If you see anything suspicious, contact the provider's support or security team and consider changing related credentials.

3. **Remove the key from the repo and its history.** Deleting it in a new commit isn't enough, since it stays in git history. Use `git filter-repo` or BFG Repo-Cleaner to purge it, then force-push. Assume the key was already scraped, because bots find leaked keys within minutes. Cleanup is hygiene, not a substitute for step 1.

4. **Move secrets out of your code.** Use environment variables, a `.env` file listed in `.gitignore`, or a secrets manager. Deploy the new key this way, and check whether other secrets were committed too.

5. **Add safeguards to prevent a repeat.** Turn on GitHub secret scanning and push protection, add a pre-commit hook like `gitleaks` or `trufflehog`, and restrict the new key's scope, permissions, and IP or referrer where the provider allows it.

---

**Run 3**

_stop: complete (end_turn)_

1. **Revoke or rotate the key immediately.** Do this in the provider's dashboard before anything else. Once the old key is dead, the leak can't be exploited. Generate a new key and update your apps with it, using environment variables or a secrets manager rather than hardcoding.

2. **Check for abuse.** Review the provider's usage logs, billing, and any connected resources for activity you don't recognize, such as unusual requests, new resources spun up, or unexpected charges. Bots scrape GitHub for keys within minutes, so assume it was found. If you see abuse, contact the provider's support, since many will waive fraudulent charges.

3. **Remove the key from the repo and its history.** Deleting the file in a new commit isn't enough, because the key stays in git history. Use `git filter-repo` or BFG Repo-Cleaner to purge it, then force-push. Also check forks, open PRs, and other branches. Treat the key as compromised regardless, since cached copies and clones may exist.

4. **Audit what the key could access.** Look at its permissions and what it touched. If it had access to databases, cloud accounts, or other credentials, rotate those too. Check for new users, tokens, or changed settings that an attacker might have created to keep access.

5. **Prevent a repeat.** Add the file or pattern to `.gitignore`, and enable GitHub secret scanning and push protection. You can also add a pre-commit hook like `gitleaks` or `trufflehog`. Keep secrets in `.env` files (not committed) or a proper secrets manager.

If you tell me which provider the key was for (AWS, OpenAI, Stripe, etc.), I can give you the specific steps for revoking it and checking for abuse.

</details>

## OpenRouter vs direct

### sonnet-5.5

| Metric              | OpenRouter | Anthropic direct | Delta vs Anthropic direct |
| ------------------- | ---------- | ---------------- | ------------------------- |
| Median TTFT         | 789 ms     | 762 ms           | +4%                       |
| Median total        | 2,411 ms   | 3,202 ms         | -25%                      |
| Total input tokens  | 1,659      | 1,659            | +0%                       |
| Total output tokens | 5,504      | 5,757            | -4%                       |
| Total cost          | $0.05836   | $0.06089         | -4%                       |
