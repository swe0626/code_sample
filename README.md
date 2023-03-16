# code_sample
I had to develop a custom pagination hook because the limit of the backend API prevented me from knowing the page count or total item count in advance. Page navigation had to be done only via "next" and "prev" buttons.

Although this seemed easy, it presented several complex issues, such as dynamically changing page size, caching previous pages without making a new API call, infinite re-rendering due to various side effects, and more. While several libraries, such as SWR and react-infinite-scroll-hook, support similar functions, I created my own custom hook.

To solve the problem, I wrote a cache context for general use. I leveraged my expertise with React hooks to combine various hooks and control their dependencies expertly, and I managed to successfully solve the challenge within the given timeframe.
