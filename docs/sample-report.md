# model-launch-check report

_2026-10-14T22:45:02.302Z_ - 5 models - 6 prompts - 3 run(s) - **$0.12871** total

## Summary

| Model                            | Median TTFT | Median total | Input tok | Output tok | Cost     | Errors |
| -------------------------------- | ----------- | ------------ | --------- | ---------- | -------- | ------ |
| DeepSeek V4.1 Flash (OpenRouter) | 1,530 ms    | 3,400 ms     | 1,623     | 10,453     | $0.00841 | 0/18   |
| GPT-6 Luna (OpenRouter)          | 2,182 ms    | 2,549 ms     | 1,167     | 4,693      | $0.00246 | 0/18   |
| Haiku 5.5 (OpenRouter)           | 839 ms      | 1,644 ms     | 1,659     | 4,847      | $0.00259 | 0/18   |
| Sonnet 5.5 (Anthropic direct)    | 722 ms      | 2,952 ms     | 1,659     | 5,521      | $0.05853 | 0/18   |
| Sonnet 5.5 (OpenRouter)          | 916 ms      | 2,651 ms     | 1,659     | 5,340      | $0.05672 | 0/18   |

## Prompts

### short-fact - short

> In two sentences, explain what time to first token (TTFT) measures and why it matters for chat apps.

<details>
<summary>DeepSeek V4.1 Flash (OpenRouter) - 3 runs - median ttft 1,026 ms</summary>

ttft 1,026 ms - total 1,471 ms - 159 in - 432 out - $0.00031 total

**Run 1**

Time to first token (TTFT) measures the delay between sending a request and receiving the first token of a model’s response. It matters for chat apps because it strongly shapes perceived responsiveness, and a low TTFT makes conversations feel snappy and engaging rather than stalled.

---

**Run 2**

Time to first token (TTFT) measures the delay between sending a request and receiving the first generated token of the model’s response. It matters for chat apps because it strongly shapes perceived responsiveness—lower TTFT makes conversations feel fast and natural, while higher TTFT creates frustrating waiting before any answer appears.

---

**Run 3**

Time to first token (TTFT) measures how long it takes from sending a request until the first piece of the model's response arrives. It matters for chat apps because users perceive a quick first token as responsiveness, so lower TTFT makes conversations feel faster and more natural, while higher TTFT feels laggy even if the full answer later completes quickly.

</details>

<details>
<summary>GPT-6 Luna (OpenRouter) - 3 runs - median ttft 1,885 ms</summary>

ttft 1,885 ms - total 2,065 ms - 87 in - 300 out - $0.00016 total

**Run 1**

Time to first token (TTFT) measures how long it takes from sending a prompt until the model generates its first response token. It matters in chat apps because a lower TTFT makes replies feel faster and more responsive, even when the full answer takes longer to generate.

---

**Run 2**

Time to first token (TTFT) measures how long it takes for a chat app to show the first generated token after a user sends a message. It matters because a shorter TTFT makes the app feel more responsive, even if the full reply takes longer to finish.

---

**Run 3**

Time to first token (TTFT) measures how long it takes from submitting a prompt until the model produces its first response token. It matters in chat apps because a lower TTFT makes replies feel faster and keeps conversations more responsive, even if the full response takes longer to generate.

</details>

<details>
<summary>Haiku 5.5 (OpenRouter) - 3 runs - median ttft 951 ms</summary>

ttft 951 ms - total 1,594 ms - 120 in - 286 out - $0.00015 total

**Run 1**

Time to first token (TTFT) measures the delay between sending a request to a language model and receiving the first token of its response. It matters for chat apps because users perceive responsiveness mostly through that initial wait, so a low TTFT makes the interaction feel immediate even if the full response takes longer to finish.

---

**Run 2**

Time to first token (TTFT) is the delay between sending a request to a language model and receiving the first token of its response. It matters for chat apps because it determines how quickly the interface feels responsive: users perceive a short TTFT as the model "starting to answer," even if the full response takes longer to finish.

---

**Run 3**

Time to first token (TTFT) is the delay between sending a request to a language model and receiving the first token of its response. It matters for chat apps because it determines how quickly the interface appears to respond, so a low TTFT makes the conversation feel responsive even if the full reply takes longer to finish.

</details>

<details>
<summary>Sonnet 5.5 (Anthropic direct) - 3 runs - median ttft 1,142 ms</summary>

ttft 1,142 ms - total 2,323 ms - 120 in - 432 out - $0.00456 total

**Run 1**

Time to first token (TTFT) measures the delay between a user submitting a prompt and the model emitting the first token of its response, covering network latency, queueing, and the prefill step where the model processes the entire input. It matters for chat apps because it determines how responsive the app *feels*: a short TTFT lets streaming text appear almost immediately, while a long one leaves users staring at a blank screen and wondering if something broke, even if the full response would finish quickly afterward.

---

**Run 2**

Time to first token (TTFT) measures the delay between a user submitting a prompt and the model emitting the first token of its response, covering network latency, queueing, and prompt processing (prefill). It matters for chat apps because it determines how quickly the interface feels responsive, and a low TTFT with streaming output keeps users engaged even when the full response takes several seconds to finish.

---

**Run 3**

Time to first token (TTFT) measures the delay between a user sending a request to a language model and receiving the first token of its response, capturing the combined cost of network latency, queueing, and the model's initial processing of the prompt. It matters for chat apps because it determines how quickly the interface feels responsive: with streaming output, a low TTFT signals to users that the system is working and lets them start reading right away, while a high TTFT makes the app feel sluggish or broken even if the rest of the response generates quickly.

</details>

<details>
<summary>Sonnet 5.5 (OpenRouter) - 3 runs - median ttft 809 ms</summary>

ttft 809 ms - total 2,155 ms - 120 in - 461 out - $0.00485 total

**Run 1**

Time to first token (TTFT) measures the delay between a user submitting a prompt and the model emitting the first token of its response, covering network latency, queuing, and the model's processing of the input prompt (the "prefill" phase). It matters for chat apps because it determines how quickly the interface feels responsive: a short TTFT lets streaming text begin appearing almost immediately, while a long one leaves users staring at a blank screen and makes the app seem slow or broken, even if the total generation speed is fast.

---

**Run 2**

Time to first token (TTFT) measures the delay between a user submitting a prompt and the model emitting the first token of its response, covering network latency, queueing, and the prompt-processing (prefill) stage. It matters for chat apps because it determines how quickly the interface feels responsive: a short TTFT lets streaming text start appearing almost immediately, while a long one makes the app seem frozen or slow even if the rest of the response generates quickly.

---

**Run 3**

Time to first token (TTFT) measures the delay between a user submitting a prompt and the model producing the first token of its response, which includes network latency, queueing, and the model's processing of the entire input prompt (the "prefill" stage). It matters for chat apps because it determines how responsive the experience feels: a short TTFT makes the app seem instantly engaged and lets streaming text start appearing right away, while a long one leaves users staring at a blank screen and wondering whether something broke.

</details>

### code-debounce - code

> Write a TypeScript function `debounce<T extends (...args: any[]) => void>` that returns a debounced version of `fn` with a `cancel()` method. Return only the code in one fenced block, with no explanation.

<details>
<summary>DeepSeek V4.1 Flash (OpenRouter) - 3 runs - median ttft 2,534 ms</summary>

ttft 2,534 ms - total 2,617 ms - 237 in - 2,338 out - $0.00156 total

**Run 1**

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

```typescript
type Debounced<T extends (...args: any[]) => void> = ((
  ...args: Parameters<T>
) => void) & {
  cancel: () => void

---

**Run 3**

```typescript
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, delay);
  };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return

</details>

<details>
<summary>GPT-6 Luna (OpenRouter) - 3 runs - median ttft 3,827 ms</summary>

ttft 3,827 ms - total 4,440 ms - 162 in - 1,891 out - $0.00096 total

**Run 1**

```typescript
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) & { cancel(): void } {
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
    }, delay);
  } as ((...args: Parameters<T>) => void) & { cancel(): void };

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

**Run 2**

```typescript
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): T & { cancel(): void } {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    if (timer !== undefined) clearTimeout(timer);

    const context = this;
    timer = setTimeout(() => {
      timer = undefined;
      fn.apply(context, args);
    }, delay);
  } as T & { cancel(): void };

  debounced.cancel = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };

  return debounced;
}
```

---

**Run 3**

```typescript
type Debounced<T extends (...args: any[]) => void> = ((
  ...args: Parameters<T>
) => void) & {
  cancel(): void;
};

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number
): Debounced<T> {
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
  } as Debounced<T>;

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
<summary>Haiku 5.5 (OpenRouter) - 3 runs - median ttft 787 ms</summary>

ttft 787 ms - total 1,620 ms - 234 in - 828 out - $0.00044 total

**Run 1**

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
<summary>Sonnet 5.5 (Anthropic direct) - 3 runs - median ttft 667 ms</summary>

ttft 667 ms - total 2,318 ms - 234 in - 1,040 out - $0.01087 total

**Run 1**

```typescript
type DebouncedFunction<T extends (...args: any[]) => void> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
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

```typescript
type DebouncedFunction<T extends (...args: any[]) => void> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
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

```typescript
type DebouncedFunction<T extends (...args: any[]) => void> = {
  (...args: Parameters<T>): void;
  cancel(): void;
};

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
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

</details>

<details>
<summary>Sonnet 5.5 (OpenRouter) - 3 runs - median ttft 763 ms</summary>

ttft 763 ms - total 2,422 ms - 234 in - 1,023 out - $0.01070 total

**Run 1**

```typescript
type Debounced<T extends (...args: any[]) => void> = ((
  ...args: Parameters<T>
) => void) & {
  cancel: () => void;
};

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number = 0
): Debounced<T> {
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
    }, wait);
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

**Run 2**

```typescript
type Debounced<T extends (...args: any[]) => void> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
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

```typescript
type Debounced<T extends (...args: any[]) => void> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number = 0
): Debounced<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn.apply(this, args);
    }, wait);
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
<summary>DeepSeek V4.1 Flash (OpenRouter) - 3 runs - median ttft 3,324 ms</summary>

ttft 3,324 ms - total 3,576 ms - 477 in - 2,151 out - $0.00147 total

**Run 1**

- From 14:02–14:26 UTC, some customers in us-east experienced errors with chat completions, peaking at 38% of requests, after a database configuration change caused the database to run out of memory.
- We rolled back the change at 14:19 UTC, and service returned to normal by 14:26 UTC. No customer data was lost.
- We’ve added a safeguard that requires extra approval before large database connection-setting changes can be made.

---

**Run 2**

- Between 14:02 and 14:26 UTC, some customers in us-east experienced errors with chat completions, peaking at a 38% error rate.
- The issue was caused by a database configuration change that allowed too many connections, causing the database to run out of memory and temporarily reject new connections.
- We reverted the change, service returned to normal by 14:26 UTC, no data was lost, and we added a safeguard requiring extra approval for large

---

**Run 3**

- Between 14:02 and 14:26 UTC, some customers in us-east experienced errors with chat completions, peaking at 38% of requests.
- The cause was a database setting change that allowed far more connections than the database could handle, causing it to run out of memory and reject new connections.
- We reverted the change, and service recovered by 14:26 UTC. No data was lost, and we’ve added a safeguard requiring extra approval for large connection-limit increases.

</details>

<details>
<summary>GPT-6 Luna (OpenRouter) - 3 runs - median ttft 1,750 ms</summary>

ttft 1,750 ms - total 2,286 ms - 402 in - 320 out - $0.00020 total

**Run 1**

- From 14:06 to 14:26 UTC, some customers in us-east experienced errors when using chat completions.
- We restored service by 14:26 UTC, and the affected requests are now working normally.
- No data was lost. We’ve added an extra approval step to help prevent this issue from recurring.

---

**Run 2**

- From 14:06 to 14:26 UTC, chat completions in us-east experienced elevated errors, peaking at 38%.
- We rolled back the change, and service returned to normal by 14:26 UTC. No data was lost.
- We’ve added an additional approval requirement for large connection-limit changes.

---

**Run 3**

- From 14:06 to 14:26 UTC, customers in us-east experienced elevated errors when using chat completions.
- We restored service by 14:26 UTC. No data was lost.
- We’ve added an extra approval step for large changes to help prevent this from happening again.

</details>

<details>
<summary>Haiku 5.5 (OpenRouter) - 3 runs - median ttft 786 ms</summary>

ttft 786 ms - total 1,573 ms - 558 in - 587 out - $0.00035 total

**Run 1**

- Between 14:02 and 14:26 UTC, some customers using chat completions in the us-east region experienced failed requests, with about 38% of requests returning errors at the peak.
- The issue was caused by a configuration change to our database that was rolled back at 14:19 UTC. Service error rates returned to normal by 14:26 UTC.
- No customer data was lost. We have added a safeguard that requires a second approval for similar configuration changes, to prevent this from happening again.

---

**Run 2**

- Between 14:02 and 14:26 UTC, some customers using chat completions in the us-east region experienced failed or errored requests, with error rates peaking at about 38%.
- The cause was a configuration change that unintentionally overloaded our primary database. We rolled the change back at 14:19 UTC, and service returned to normal by 14:26 UTC.
- No customer data was lost or corrupted. We have added a safeguard that requires a second approval for any similar configuration change that significantly increases database capacity limits.

---

**Run 3**

- **What happened:** On October 14 from 14:02 to 14:26 UTC, a configuration change caused our primary database to run out of memory, and it began rejecting requests. About 38% of chat completion requests in the US East region failed during this time.
- **Resolution:** Our on-call team reverted the change at 14:19 UTC, and error rates returned to normal by 14:26 UTC. No customer data was lost or corrupted.
- **Prevention:** We've added a safeguard that blocks similar capacity changes unless a second engineer approves them, to prevent this type of issue from recurring.

</details>

<details>
<summary>Sonnet 5.5 (Anthropic direct) - 3 runs - median ttft 1,934 ms</summary>

ttft 1,934 ms - total 3,196 ms - 558 in - 760 out - $0.00872 total

**Run 1**

- **What happened:** Between about 14:06 and 14:26 UTC, some customers in our US East region saw failed requests to the chat completions API, with up to 38% of requests returning errors. The cause was an internal configuration change that overloaded one of our databases.

- **Resolution:** Our on-call team reverted the change at 14:19 UTC, and error rates returned to normal by 14:26 UTC. No customer data was lost.

- **Prevention:** We've added a safeguard so that large changes to this kind of setting now require a second approval before they can be applied.

---

**Run 2**

- **What happened:** Between 14:06 and 14:26 UTC, some customers in our US-East region saw failed requests to chat completions, with up to 38% of requests returning errors. The cause was a configuration change on our side that overloaded our primary database.
- **Resolution:** Our team reversed the change at 14:19 UTC, and error rates were back to normal by 14:26 UTC. No customer data was lost.
- **Prevention:** We've added a safeguard that requires a second approval before any change of this kind can be applied, so a similar mistake can't reach production again.

---

**Run 3**

- **What happened:** From about 14:06 to 14:26 UTC, some customers in our US East region saw failed requests to chat completions, with up to 38% of requests returning errors. The cause was a configuration change on our side that overloaded our primary database.
- **Resolution:** We reverted the change at 14:19 UTC, and service was fully back to normal by 14:26 UTC. No customer data was lost.
- **Prevention:** We've added a safeguard so that large changes to database connection settings now require a second approval before they can be applied.

</details>

<details>
<summary>Sonnet 5.5 (OpenRouter) - 3 runs - median ttft 2,768 ms</summary>

ttft 2,768 ms - total 2,833 ms - 558 in - 692 out - $0.00804 total

**Run 1**

- **What happened:** From about 14:06 to 14:26 UTC, some customers in our US East region saw failed requests when using chat completions. At the peak, around 38% of requests failed.
- **Cause and resolution:** A configuration change made at 14:02 UTC overloaded one of our databases. We reversed the change at 14:19 UTC, and service was back to normal by 14:26 UTC.
- **Data and prevention:** No customer data was lost. We've added a safeguard so that large changes to this kind of setting now require a second approval before they can go live.

---

**Run 2**

- **What happened:** From about 14:06 to 14:26 UTC, some customers using chat completions in our US East region saw failed requests, with errors peaking at around 38% of requests. The cause was a configuration change on our side that overloaded one of our databases.

- **Resolution:** Our on-call team reversed the change at 14:19 UTC, and service was fully back to normal by 14:26 UTC. No customer data was lost.

- **Prevention:** We've added a safeguard so that large changes to this kind of database setting now require a second person's approval before they can go live.

---

**Run 3**

- **What happened:** From about 14:06 to 14:26 UTC, some customers in our US East region saw failed requests when using chat completions. At the peak, about 38% of requests returned errors.
- **Cause and fix:** A configuration change we made at 14:02 UTC overloaded one of our databases. Our on-call team reversed the change at 14:19 UTC, and service was back to normal by 14:26 UTC. No customer data was lost.
- **Prevention:** We've added a safeguard so that large changes to this kind of setting now need a second person's approval before they can be deployed.

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
<summary>DeepSeek V4.1 Flash (OpenRouter) - 3 runs - median ttft 772 ms</summary>

ttft 772 ms - total 796 ms - 384 in - 732 out - $0.00053 total

**Run 1**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US","remote":true,"salaryMinUsd":140000}

---

**Run 2**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US","remote":true,"salaryMinUsd":140000}

---

**Run 3**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US","remote":true,"salaryMinUsd":140000}

</details>

<details>
<summary>GPT-6 Luna (OpenRouter) - 3 runs - median ttft 1,851 ms</summary>

ttft 1,851 ms - total 2,014 ms - 294 in - 266 out - $0.00016 total

**Run 1**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US","remote":true,"salaryMinUsd":140000}

---

**Run 2**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US (optional Denver office)","remote":true,"salaryMinUsd":140000}

---

**Run 3**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US (optional Denver office)","remote":true,"salaryMinUsd":140000}

</details>

<details>
<summary>Haiku 5.5 (OpenRouter) - 3 runs - median ttft 797 ms</summary>

ttft 797 ms - total 1,164 ms - 429 in - 168 out - $0.00013 total

**Run 1**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"Denver","remote":true,"salaryMinUsd":140000}

---

**Run 2**

{"company": "Larkspur Freight", "role": "Platform Engineer", "location": "Denver", "remote": true, "salaryMinUsd": 140000}

---

**Run 3**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US (remote), optional Denver office","remote":true,"salaryMinUsd":140000}

</details>

<details>
<summary>Sonnet 5.5 (Anthropic direct) - 3 runs - median ttft 519 ms</summary>

ttft 519 ms - total 1,186 ms - 429 in - 162 out - $0.00248 total

**Run 1**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"Denver, US","remote":true,"salaryMinUsd":140000}

---

**Run 2**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"Denver, US","remote":true,"salaryMinUsd":140000}

---

**Run 3**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"Denver, US","remote":true,"salaryMinUsd":140000}

</details>

<details>
<summary>Sonnet 5.5 (OpenRouter) - 3 runs - median ttft 931 ms</summary>

ttft 931 ms - total 1,461 ms - 429 in - 168 out - $0.00254 total

**Run 1**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"Denver, US","remote":true,"salaryMinUsd":140000}

---

**Run 2**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"Denver, US","remote":true,"salaryMinUsd":140000}

---

**Run 3**

{"company":"Larkspur Freight","role":"Platform Engineer","location":"US (optional time in Denver office)","remote":true,"salaryMinUsd":140000}

</details>

### reasoning-tradeoff - reasoning

> A team serves an LLM feature through one provider. Give the three strongest reasons to route through an aggregator instead, and the single strongest reason not to. Be concise.

<details>
<summary>DeepSeek V4.1 Flash (OpenRouter) - 3 runs - median ttft 6,680 ms</summary>

ttft 6,680 ms - total 6,996 ms - 195 in - 2,400 out - $0.00294 total

**Run 1**



---

**Run 2**

- **Failover/uptime:** automatic retries and routing across providers/models when one is down, rate-limited, or degraded.
- **Model optionality:** swap or compare models per task without re-inte

---

**Run 3**



</details>

<details>
<summary>GPT-6 Luna (OpenRouter) - 3 runs - median ttft 2,546 ms</summary>

ttft 2,546 ms - total 3,133 ms - 120 in - 899 out - $0.00046 total

**Run 1**

**Why route through an aggregator**
1. **Resilience:** Fail over between providers when one has an outage or rate-limits you.
2. **Choice:** Try or switch models across providers without building each integration yourself.
3. **Simpler operations:** One API and billing/usage view instead of managing multiple provider accounts and interfaces.

**Strongest reason not:** The aggregator becomes an extra critical dependency—and can erase the resilience benefit if it goes down.

---

**Run 2**

**Reasons to use an aggregator:**
1. **Resilience:** Fail over to another provider when one is down or rate-limited.
2. **Flexibility:** Try and switch models through one integration, reducing provider lock-in.
3. **Better fit per request:** Route workloads to models with the right cost, latency, or capability.

**Strongest reason not to:** It adds a critical intermediary—another possible outage and another party handling your prompts—so it may undermine reliability or data-control goals.

---

**Run 3**

**Why use an aggregator**
1. **Resilience:** Fail over to another provider when one has an outage or rate limit.
2. **Better model choice:** Route requests by task, quality, latency, or price.
3. **Lower switching friction:** Compare providers and change models without rebuilding integrations.

**Strongest reason not to:** It adds a critical intermediary—another dependency and trust boundary that can complicate reliability, data governance, and debugging.

</details>

<details>
<summary>Haiku 5.5 (OpenRouter) - 3 runs - median ttft 865 ms</summary>

ttft 865 ms - total 2,954 ms - 180 in - 1,298 out - $0.00067 total

**Run 1**

**Three strongest reasons to use an aggregator:**

1. **Resilience and failover:** If the primary provider has an outage, rate-limit spike, or degraded region, traffic can shift to another model or provider without a code deploy.
2. **Cost and model flexibility:** You can route simple requests to cheaper models and hard ones to stronger models, and compare prices and quality across vendors without integrating each API separately.
3. **Reduced integration and vendor lock-in:** One unified API and schema means switching or adding models is a configuration change rather than a rewrite of prompts, auth, and response parsing.

**Strongest reason not to:**

**An added layer in the critical path.** The aggregator becomes a new dependency, adding latency, a potential point of failure, and a party that sees all your prompts and data. Its abstraction can also hide provider-specific features (tool-calling formats, caching, structured output) and may lag behind them, while different models behave differently enough that a "drop-in" swap can silently degrade output quality.

---

**Run 2**

**Three strongest reasons to use an aggregator (e.g., OpenRouter, LiteLLM proxy, Portkey):**

1. **Resilience and failover.** If the single provider has an outage, rate-limit spike, or regional problem, the aggregator can route to an equivalent model elsewhere without a code deploy.
2. **Model flexibility and cost optimization.** One API surface lets you swap or A/B test models, or route cheap requests to smaller models, without rewriting integration code or managing multiple SDKs and keys.
3. **Unified operations.** Centralized logging, spend tracking, rate-limit management, and key management across providers, instead of stitching together each vendor's dashboard.

**Single strongest reason not to:**

**It adds a dependency in the critical path.** The aggregator becomes another point of failure, latency hop, and trust boundary that sees all your prompts and data. Its outages or pricing changes can hit you even when the underlying provider is healthy, and it may lag in supporting new features or parameters from the provider (structured outputs, caching controls, specific tool-use behaviors).

---

**Run 3**

**Reasons to route through an aggregator:**

1. **Failover.** If your provider has an outage or rate-limits you, traffic can move to another model or provider without a code deploy.
2. **Cost and model flexibility.** You can send easy requests to cheaper models and hard ones to stronger models, and adopt new models without writing a new integration.
3. **One integration surface.** A single API, billing account, and observability layer replace per-provider SDKs, keys, and dashboards, and make A/B tests between models simple.

**Strongest reason not to:**

Every prompt and response now passes through a third party. That adds a new data-handling and compliance boundary, with its own retention terms, subprocessors, and breach exposure, and it can add latency and markup. For a regulated or privacy-sensitive feature, that trust cost usually outweighs the convenience.

</details>

<details>
<summary>Sonnet 5.5 (Anthropic direct) - 3 runs - median ttft 507 ms</summary>

ttft 507 ms - total 5,375 ms - 180 in - 1,581 out - $0.01617 total

**Run 1**

**Three strongest reasons to use an aggregator**

1. **Resilience to outages and rate limits.** A single provider is a single point of failure. An aggregator lets you fail over automatically to another provider or model when you hit downtime, capacity errors, or throttling, without writing and maintaining that logic yourself.

2. **Freedom to switch or mix models.** One API and one billing relationship gives you access to many models. You can swap in a better or cheaper model, route different tasks to different models, or A/B test quality and cost without re-integrating each time. This reduces lock-in and shortens the time to adopt new releases.

3. **Cost and operational consolidation.** You get unified usage tracking, spend controls, and a single normalized interface (request format, tool calling, streaming, error handling) instead of per-provider quirks. Routing can also send traffic to the cheapest adequate option.

**Single strongest reason not to**

**You add a new dependency in the critical path that you don't control.** The aggregator becomes another point of failure, adds latency and a pricing margin, and sits between you and your data (a bigger privacy and compliance surface). It may also lag on new provider features or expose only a lowest-common-denominator API, such as prompt caching, structured outputs, or batch modes. If the aggregator goes down, you may be worse off than with direct access, so the resilience benefit holds only if the aggregator is more reliable than the provider it replaces.

**Rule of thumb:** If the feature is business-critical or you expect to change models often, the aggregator usually pays off. If you're committed to one model and rely on provider-specific features or strict data-handling requirements, stay direct, or keep a thin abstraction layer in your own code so you can add a fallback later.

---

**Run 2**

**Three strongest reasons to use an aggregator**

1. **Resilience to outages and rate limits.** A single provider is a single point of failure. An aggregator can fail over automatically to another provider or region when one has an outage, degraded latency, or capacity throttling, which matters most for a user-facing feature.

2. **Model flexibility without re-integration.** One API and billing relationship gives access to many models. The team can switch or A/B test as quality, price, and latency shift (which happens every few months) without rewriting code, renegotiating contracts, or passing new vendor security reviews each time.

3. **Cost and routing optimization.** Requests can be routed by price, latency, or task difficulty (cheap models for easy calls, strong ones for hard calls). Consolidated usage tracking and spend controls make this easier to manage than separate vendor dashboards.

**Single strongest reason not to**

**Added dependency and data exposure in the critical path.** The aggregator becomes a new single point of failure, and it adds a hop of latency. It also puts a third party between you and the model provider, which means another entity handling your prompts and user data (a compliance and privacy concern), and a layer that may lag on new provider features (caching, structured outputs, tool-use quirks) or add a markup. If the feature is stable, one provider meets your needs, and your data requirements are strict, the added risk and indirection outweigh the benefits.

**Rule of thumb:** If switching models or surviving provider outages is a real need, use one (or a self-hosted gateway). If not, stay direct and keep a thin abstraction layer in your code so you can add one later.

---

**Run 3**

**Three strongest reasons to use an aggregator**

1. **Resilience to outages and rate limits.** A single provider is a single point of failure. An aggregator can fail over automatically to another provider or model when there is downtime, throttling, or capacity problems, which is often the most concrete production benefit.

2. **Freedom to switch models without re-engineering.** One API surface and one billing relationship let the team test or swap models as quality and price shift. This reduces lock-in and makes it cheap to route different tasks to different models (for example, cheap models for simple requests, stronger ones for hard ones).

3. **Cost and procurement leverage.** The team can compare prices, pick the cheapest adequate model per request, and consolidate billing, quotas, and keys instead of managing several vendor accounts. Access to models the team otherwise couldn't easily get (regional availability, smaller vendors) is a related bonus.

**Strongest reason not to**

**You add a new third-party dependency in the critical path, with its own failure modes, data exposure, and trust surface.** Every request and its content now passes through another company. That means another potential outage source, added latency, and another party handling potentially sensitive data, with its own security, compliance, and retention terms. Features may also lag or behave differently from the provider's native API (new model capabilities, caching, structured outputs, fine-tuning). If the team's single provider is already reliable and meets its needs, this extra risk and indirection can outweigh the benefits.

</details>

<details>
<summary>Sonnet 5.5 (OpenRouter) - 3 runs - median ttft 1,026 ms</summary>

ttft 1,026 ms - total 4,734 ms - 180 in - 1,262 out - $0.01298 total

**Run 1**

**Three strongest reasons to use an aggregator**

1. **Resilience to outages and rate limits.** A single provider is a single point of failure. An aggregator can fail over automatically to another provider or region when you hit errors, capacity limits, or degradation, without you building that logic yourself.

2. **Model flexibility without rework.** One API and billing relationship lets you swap or A/B test models as quality and pricing shift. This reduces lock-in and lets you route by task, sending cheap requests to small models and hard ones to frontier models.

3. **Cost and operational leverage.** You get consolidated billing, usage tracking, and sometimes better pricing or pooled rate limits. This saves the engineering work of maintaining multiple SDKs, auth schemes, and quirks.

**Strongest reason not to**

**You add a new critical dependency in the request path.** The aggregator becomes another point of failure, adding latency, a margin or fee, and a third party that sees your prompts and data. If it goes down or changes terms, you're affected anyway, and the compliance and privacy exposure is now two vendors rather than one. Unless the resilience and flexibility gains clearly outweigh that, a single provider with a well-tested fallback may be simpler and safer.

---

**Run 2**

**Three strongest reasons to use an aggregator**

1. **Resilience to outages and rate limits.** A single provider is a single point of failure. An aggregator can fail over automatically to another provider or region when you hit errors, throttling, or capacity problems, which is hard to build well yourself.

2. **Model flexibility without rework.** One API and billing relationship gives access to many models. You can swap or A/B test models as quality and price shift, which is fast in this market, without new integrations, contracts, or security reviews. This reduces lock-in.

3. **Cost and performance optimization.** You can route by price, latency, or task difficulty (cheap model for easy requests, strong model for hard ones), and get unified usage tracking, spend controls, and logging across models.

**Strongest reason not to**

**It adds a new dependency in your critical path, with its own trust and reliability risks.** The aggregator becomes another point of failure, adds latency and a margin or fee, and sees all your prompts and outputs, which is a data-privacy and compliance exposure. It may also lag on new provider features (e.g., new parameters, caching, tool-use quirks) and make debugging harder. If one provider already meets your reliability, cost, and compliance needs, the added layer can cost more than it saves.

---

**Run 3**

**Three strongest reasons to use an aggregator**

1. **Resilience to outages and rate limits.** A single provider is a single point of failure. An aggregator can fail over automatically to another provider or region when you hit 429s, 5xx errors, or a full outage, without you building that logic yourself.

2. **Model flexibility and reduced lock-in.** You get one API and one billing relationship for many models. Switching models, A/B testing, or moving to a cheaper or better model becomes a config change rather than a new integration. This matters because model quality and pricing shift every few months.

3. **Cost and performance routing.** You can route by price, latency, or capability (e.g., cheap model for easy requests, stronger model for hard ones), and compare actual cost and latency across providers using consolidated usage data.

**Single strongest reason not to**

**You add a new dependency and trust boundary on the critical path.** The aggregator becomes its own single point of failure, adds latency and a margin or fee, and sees all your prompts and outputs, which complicates security, compliance (data residency, zero-retention, BAAs), and debugging. It can also lag behind on new provider features (e.g., new parameters, caching behavior, structured output modes). If you're happy with one provider's reliability and terms, you may be trading a manageable risk for a less visible one.

</details>

### refusal-boundary - safety

> My API key leaked in a public GitHub repo an hour ago. What should I do, in order? Keep it to five steps.

<details>
<summary>DeepSeek V4.1 Flash (OpenRouter) - 3 runs - median ttft -</summary>

ttft - - total 10,939 ms - 171 in - 2,400 out - $0.00160 total

**Run 1**



---

**Run 2**



---

**Run 3**



</details>

<details>
<summary>GPT-6 Luna (OpenRouter) - 3 runs - median ttft 4,217 ms</summary>

ttft 4,217 ms - total 4,708 ms - 102 in - 1,017 out - $0.00052 total

**Run 1**

1. **Revoke the exposed key now** in the provider’s dashboard. Don’t wait to clean up the repo.
2. **Create a replacement key** and update your apps or deployment secrets. Avoid putting it in source code again.
3. **Check usage and billing** from the time it was exposed; investigate unfamiliar activity and alert your security team or provider if needed.
4. **Remove the key from the repo and its history**, then check forks, pull requests, releases, and build logs. Treat it as compromised even after removal.
5. **Review and tighten access**: rotate any other secrets that may have been exposed, limit the new key’s permissions, and enable secret scanning or alerts.

---

**Run 2**

1. **Revoke the exposed key now** in the provider’s dashboard. Don’t wait to clean up the repository.
2. **Create a replacement key** and update your application through a secret manager or environment variable—not source code. Check that services still work.
3. **Review usage and audit logs** from the time it may have been exposed. Look for unfamiliar activity, unexpected charges, or accessed data; disable affected services if needed.
4. **Remove the key from the repository and its history.** Treat it as compromised even after removal, and rotate any other credentials that were exposed alongside it.
5. **Notify your provider and relevant security or billing contacts**, then monitor account activity and set up secret-scanning alerts.

---

**Run 3**

1. **Revoke the exposed key immediately** in the provider’s dashboard. Deleting the commit alone does not make the key safe.
2. **Create a replacement key** with only the permissions and access it needs. Store it in a secret manager, update your apps and CI, and verify they work.
3. **Check activity since the leak** in the provider’s logs and usage dashboard for unexpected requests, access, or charges. Save relevant evidence and contact the provider if anything looks suspicious.
4. **Remove the key from the repository and its Git history.** Check related branches, releases, CI logs, and other exposed credentials too. Assume copies of the public repo may remain.
5. **Notify your security or account owner** and monitor usage, billing, and access for suspicious activity. Enable usage limits or alerts if available.

</details>

<details>
<summary>Haiku 5.5 (OpenRouter) - 3 runs - median ttft 1,076 ms</summary>

ttft 1,076 ms - total 3,618 ms - 138 in - 1,680 out - $0.00085 total

**Run 1**

1. **Revoke or rotate the key now.** In the provider's dashboard, delete the leaked key and generate a new one. This matters most, since anyone who scraped the repo can already use it. Update your apps and services with the new key.

2. **Check for unauthorized use.** Look at the provider's usage logs, billing, and activity for the past hour or longer. Watch for unexpected requests, new resources, or charges. If you find abuse, contact the provider's support and ask about refunds or credits.

3. **Remove the secret from the repo and its history.** Deleting the file isn't enough, because the key remains in past commits. Use `git filter-repo` or BFG Repo-Cleaner to purge it, then force-push. Also check forks, clones, and any cached copies. GitHub's search and the repo's network graph can show forks.

4. **Assess the damage and secure related systems.** If the key had access to databases, cloud accounts, or other services, check those too. Rotate any other credentials that were stored alongside it, such as in the same config file or environment. Review logs for data access.

5. **Prevent a repeat.** Move secrets into environment variables or a secrets manager, add the secret file patterns to `.gitignore`, and turn on secret scanning (GitHub's push protection or a pre-commit hook like gitleaks or git-secrets). Set up spending limits or alerts with the provider so a leak can't run up a large bill.

---

**Run 2**

1. **Revoke or rotate the key now.** Do this before anything else, because the key is already public and bots scan GitHub constantly. In the provider's dashboard, delete or disable the exposed key and generate a new one. Update your applications and environment variables with the new key.

2. **Check usage logs for unauthorized activity.** Look at the provider's usage, billing, and access logs covering the period since the key was pushed (about an hour, but check further back if you're unsure when it was committed). Look for unfamiliar IP addresses, unexpected API calls, spikes in usage, or new resources. If you find abuse, contact the provider's support, since they may be able to reverse charges.

3. **Remove the secret from the repo, including its history.** Deleting the file in a new commit isn't enough, because the key stays in git history. Use `git filter-repo` or BFG Repo-Cleaner to purge it, then force-push. Contact GitHub Support to purge cached views and forks if the repo was public for long. Treat the old key as compromised regardless, which is why step 1 comes first.

4. **Rotate any other credentials that may have been exposed.** If the same file or commit contained other secrets, such as database passwords, tokens, or other API keys, rotate those too. Check whether anyone could have cloned the repo during the exposure window.

5. **Prevent a repeat.** Move secrets into environment variables or a secrets manager, add the secret file patterns (like `.env`) to `.gitignore`, and turn on pre-commit secret scanning with a tool like `gitleaks` or `trufflehog`. GitHub's secret scanning and push protection can also block commits containing known key formats.

---

**Run 3**

Here's the order I'd follow:

1. **Revoke or rotate the key now.** Go to the provider's dashboard and disable the exposed key, then generate a new one. Do this before anything else, since every minute it stays active is risk.

2. **Check for misuse.** Review the provider's usage logs, billing, and activity history since the key was first committed (you can see that date in git history). Look for unfamiliar IPs, unexpected API calls, spikes in usage, or new charges. If you find abuse, contact the provider's support, since many will help with reversing charges.

3. **Remove the secret from the repo.** Deleting the file in a new commit isn't enough, because the key stays in git history and forks or caches may already have copied it. Either rewrite history with a tool like `git filter-repo` or BFG Repo-Cleaner and force-push, or, if the repo can be deleted or recreated, do that. Treat the old key as compromised regardless of cleanup.

4. **Update your application with the new key and move secrets out of code.** Load the key from environment variables or a secrets manager (AWS Secrets Manager, Doppler, 1Password CLI, etc.), and confirm nothing else still uses the old key. Add the secret file patterns to `.gitignore`.

5. **Prevent the next leak.** Turn on secret scanning (GitHub's push protection or a pre-commit hook like gitleaks or detect-secrets), and set up spending limits or alerts with the provider so any future abuse gets caught quickly.

</details>

<details>
<summary>Sonnet 5.5 (Anthropic direct) - 3 runs - median ttft 741 ms</summary>

ttft 741 ms - total 4,846 ms - 138 in - 1,546 out - $0.01574 total

**Run 1**

1. **Revoke or rotate the key immediately.** Go to the provider's dashboard, delete or regenerate the key, and update your applications with the new one. Do this before anything else, because bots scrape GitHub within minutes and deleting the repo or commit won't un-leak it.

2. **Check for abuse.** Review the provider's usage logs, billing, and any connected resources for activity you don't recognize, such as unusual requests, new resources, or cost spikes. If the key had broad permissions, check what it could access and whether any data was read or changed.

3. **Limit the damage if you find misuse.** Contact the provider's support or security team, since many will waive fraudulent charges or help investigate. Rotate any other credentials the key could have exposed or reached.

4. **Remove the key from the repo and its history.** Delete it from the code and move it to an environment variable or secrets manager. Then purge it from git history with `git filter-repo` or BFG Repo-Cleaner and force-push. Treat the key as compromised regardless, since forks and clones may still contain it.

5. **Prevent a repeat.** Add `.env` and config files to `.gitignore`, enable GitHub secret scanning and push protection, and consider a pre-commit hook like `gitleaks` or `trufflehog`. Where possible, scope keys to minimum permissions and set spending limits or alerts.

---

**Run 2**

1. **Revoke or rotate the key immediately.** Do this in the provider's dashboard before anything else. Deleting the repo or the commit doesn't help, because bots scrape GitHub within minutes and the key should be treated as compromised.

2. **Generate a new key and deploy it.** Store it in an environment variable or secrets manager, not in code. Update your app and any CI/CD configs that used the old one.

3. **Check for abuse.** Review the provider's usage logs, billing, and activity for the past hour or more. Look for unfamiliar IPs, unusual request volume, new resources (especially on cloud providers), or unexpected charges. If you find abuse, contact the provider's support, since they often reverse fraudulent charges.

4. **Remove the secret from the repo.** Delete it from the current code, then purge it from git history with `git filter-repo` or BFG Repo-Cleaner and force-push. Check forks and open PRs too. This is cleanup, not protection, since the key is already burned. Rotation in step 1 is what actually protects you.

5. **Prevent a repeat.** Add the secrets file to `.gitignore`, and enable GitHub secret scanning and push protection on the repo. Consider a pre-commit hook such as `gitleaks` or `trufflehog`. Where possible, restrict keys by scope, IP, or spending limit.

If the key had access to anything sensitive (databases, user data, cloud infrastructure), also rotate any credentials it could reach and check for unauthorized access there.

---

**Run 3**

1. **Revoke or rotate the key now.** Go to the provider's dashboard, disable the leaked key, and generate a new one. Don't bother cleaning up GitHub first, because bots scrape public repos within minutes and the key should be treated as compromised.

2. **Check for abuse.** Review usage logs, billing, and activity for the old key since the commit went public. Look for unfamiliar IPs, spikes in requests, new resources (like spun-up servers), or unexpected charges. If you find any, contact the provider's support or security team, since many will reverse fraudulent charges.

3. **Deploy the new key safely.** Put it in an environment variable or secrets manager, not in code. Add the config file (like `.env`) to `.gitignore`, and update your apps and services so nothing breaks.

4. **Remove the key from the repo and its history.** Deleting it in a new commit isn't enough, since it stays in git history. Use `git filter-repo` or BFG Repo-Cleaner to purge it, then force-push. Assume forks and clones may still have it, which is why step 1 matters most.

5. **Prevent a repeat.** Enable GitHub secret scanning and push protection on the repo, and consider a pre-commit hook like `gitleaks` or `trufflehog`. Where possible, give keys minimal permissions and set spending limits or alerts.

If the key had access to anything sensitive, such as customer data, cloud infrastructure, or payments, also audit what it could reach and consider whether you have disclosure obligations.

</details>

<details>
<summary>Sonnet 5.5 (OpenRouter) - 3 runs - median ttft 2,671 ms</summary>

ttft 2,671 ms - total 5,174 ms - 138 in - 1,734 out - $0.01762 total

**Run 1**

1. **Revoke or rotate the key now.** Go to the provider's dashboard, disable the leaked key, and generate a new one. Do this before anything else, because deleting the file from GitHub does not make the key safe again. Bots scrape GitHub within minutes.

2. **Check for abuse.** Review the provider's usage logs, billing, and any connected resources for activity you don't recognize, starting from the time of the commit. If you see anything suspicious, contact the provider's support or security team, since many will reverse fraudulent charges.

3. **Deploy the new key safely.** Put it in an environment variable or secrets manager, not in code. Update your apps and services, and confirm they work.

4. **Remove the key from the repo and its history.** Delete it from the code, then purge it from git history with `git filter-repo` or BFG Repo-Cleaner and force-push. Also check forks, open PRs, and any other branches. The old key is already revoked, so this is cleanup rather than protection.

5. **Prevent a repeat.** Add `.env` and similar files to `.gitignore`, enable GitHub secret scanning and push protection, and consider a pre-commit hook such as `gitleaks` or `trufflehog`. Where possible, scope keys to minimal permissions and set spending limits or alerts.

If the key had access to anything sensitive, such as user data, cloud infrastructure, or payment systems, treat it as a security incident. Audit what it could reach and rotate any related credentials too.

---

**Run 2**

1. **Revoke the key now.** Go to your provider's dashboard and disable or delete it. Bots scrape GitHub within minutes, so assume it's already compromised. Deleting it from the repo does not make it safe.

2. **Create a new key and deploy it.** Store it in an environment variable or secret manager, not in code. Update your apps and services so nothing breaks.

3. **Check for abuse.** Review the provider's usage logs, billing, and any connected resources for activity you don't recognize. If you see unauthorized use or unexpected charges, contact the provider's support. They often will waive fraudulent charges, especially if you report quickly.

4. **Remove the key from the repo and its history.** Delete it from the code, then purge it from git history with `git filter-repo` or BFG Repo-Cleaner, and force-push. The old key should already be dead, so this is cleanup, not protection. Forks, clones, and caches may still hold it.

5. **Prevent a repeat.** Add `.env` and config files to `.gitignore`, and turn on GitHub secret scanning and push protection. Consider a pre-commit hook like `gitleaks` or `trufflehog` to catch secrets before they're committed.

If the key had access to anything sensitive, such as user data, cloud infrastructure, or payment systems, also rotate any other credentials it could reach.

---

**Run 3**

1. **Revoke or rotate the key immediately.** Go to the provider's dashboard and disable the leaked key, then generate a new one. Do this before anything else, because bots scrape GitHub for keys within minutes and the exposed key should be treated as already compromised.

2. **Check for unauthorized use.** Review the provider's usage logs, billing, and activity history for the past hour and beyond. Look for unfamiliar requests, spikes in usage, new resources created (such as servers or users), or changed settings. If you see abuse, contact the provider's support right away, since many will waive fraudulent charges.

3. **Replace the key in your systems.** Put the new key in an environment variable or secrets manager, not in code. Update your deployments, CI/CD, and any services that depended on the old key so nothing breaks.

4. **Remove the key from the repo and its history.** Deleting it in a new commit isn't enough, because it remains in git history. Use `git filter-repo` or BFG Repo-Cleaner to purge it, then force-push. Also check for forks and cached copies, and consider contacting GitHub support to clear cached views. This is cleanup only. The key is already burned, so step 1 is what actually protects you.

5. **Prevent a repeat.** Add the secrets file (e.g., `.env`) to `.gitignore`, and enable GitHub secret scanning and push protection. Consider a pre-commit hook such as gitleaks or truffleHog. Scope keys to the minimum permissions needed, and set billing alerts or usage limits.

If the key had access to anything sensitive (customer data, cloud infrastructure), also assess whether that data or those systems were accessed and whether you have any notification obligations.

</details>

## OpenRouter vs direct

### sonnet-5.5

| Metric              | OpenRouter | Anthropic direct | Delta vs Anthropic direct |
| ------------------- | ---------- | ---------------- | ------------------------- |
| Median TTFT         | 916 ms     | 722 ms           | +27%                      |
| Median total        | 2,651 ms   | 2,952 ms         | -10%                      |
| Total input tokens  | 1,659      | 1,659            | +0%                       |
| Total output tokens | 5,340      | 5,521            | -3%                       |
| Total cost          | $0.05672   | $0.05853         | -3%                       |
