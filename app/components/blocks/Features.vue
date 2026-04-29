<template>
  <section class="py-20 px-4">
    <div
      class="transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none blur-0 translate-y-0 opacity-100 mt-8 flex flex-col items-start gap-4 max-w-[95rem] mx-auto"
      style="transition-delay: 0ms"
    >
      <div
        class="sharuco-spotlight-card relative w-full overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 p-8 md:p-12 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-950 dark:to-black"
        data-spotlight="off"
        style="--spotlight-x: 783.5px; --spotlight-y: 541.359375px"
      >
        <div
          aria-hidden="true"
          class="sharuco-drift-a pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-gradient-to-br from-pink-500/30 via-violet-500/20 to-indigo-500/30 blur-3xl"
        ></div>
        <div
          aria-hidden="true"
          class="sharuco-drift-b pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-500/25 via-sky-500/20 to-blue-500/25 blur-3xl"
        ></div>
        <div
          class="relative grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center"
        >
          <div class="flex flex-col items-start gap-5">
            <span
              class="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-sparkles h-3.5 w-3.5"
              >
                <path
                  d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
                ></path>
                <path d="M20 3v4"></path>
                <path d="M22 5h-4"></path>
                <path d="M4 17v2"></path>
                <path d="M5 18H3"></path></svg
              >Powered by Shiki · 30+ themes</span
            >
            <h2
              class="text-4xl md:text-5xl leading-[1.05] tracking-tighter font-bold"
            >
              Create beautiful images of your code.
            </h2>
            <p
              class="max-w-[520px] text-sm text-zinc-600 md:text-base dark:text-zinc-400"
            >
              Paste a snippet, pick a theme, and export a ready-to-share
              screenshot. Syntax colors change with the theme just like on ray.so
              — no more flat white code.
            </p>
            <ul
              class="mt-1 grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-zinc-700 sm:grid-cols-2 dark:text-zinc-300"
            >
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-paintbrush h-4 w-4 shrink-0 text-pink-500"
                >
                  <path d="m14.622 17.897-10.68-2.913"></path>
                  <path
                    d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"
                  ></path>
                  <path
                    d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"
                  ></path></svg
                >14 themes + 16 partner presets
              </li>
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-hash h-4 w-4 shrink-0 text-violet-500"
                >
                  <line x1="4" x2="20" y1="9" y2="9"></line>
                  <line x1="4" x2="20" y1="15" y2="15"></line>
                  <line x1="10" x2="8" y1="3" y2="21"></line>
                  <line x1="16" x2="14" y1="3" y2="21"></line></svg
                >Line numbers &amp; traffic lights
              </li>
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-download h-4 w-4 shrink-0 text-emerald-500"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" x2="12" y1="15" y2="3"></line></svg
                >PNG download &amp; clipboard copy
              </li>
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-keyboard h-4 w-4 shrink-0 text-sky-500"
                >
                  <path d="M10 8h.01"></path>
                  <path d="M12 12h.01"></path>
                  <path d="M14 8h.01"></path>
                  <path d="M16 12h.01"></path>
                  <path d="M18 8h.01"></path>
                  <path d="M6 8h.01"></path>
                  <path d="M7 16h10"></path>
                  <path d="M8 12h.01"></path>
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect></svg
                >Full keyboard shortcuts
              </li>
            </ul>
            <div class="mt-3 flex flex-wrap items-center gap-2">
              <span
                class="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/70 py-1 pr-3 pl-1.5 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
                ><span
                  aria-hidden="true"
                  class="h-3.5 w-3.5 shrink-0 rounded-full bg-gradient-to-br from-[#4CC8C8] to-[#202033]"
                ></span
                >Midnight</span
              ><span
                class="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/70 py-1 pr-3 pl-1.5 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
                ><span
                  aria-hidden="true"
                  class="h-3.5 w-3.5 shrink-0 rounded-full bg-gradient-to-br from-[#A58EFB] to-[#E9BFF8]"
                ></span
                >Candy</span
              ><span
                class="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/70 py-1 pr-3 pl-1.5 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
                ><span
                  aria-hidden="true"
                  class="h-3.5 w-3.5 shrink-0 rounded-full bg-gradient-to-br from-[#FFCF73] to-[#FF7A2F]"
                ></span
                >Sunset</span
              ><span
                class="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/70 py-1 pr-3 pl-1.5 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
                ><span
                  aria-hidden="true"
                  class="h-3.5 w-3.5 shrink-0 rounded-full bg-gradient-to-br from-[#CF2F98] to-[#6A3DEC]"
                ></span
                >Breeze</span
              ><span
                class="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/70 py-1 pr-3 pl-1.5 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
                ><span
                  aria-hidden="true"
                  class="h-3.5 w-3.5 shrink-0 rounded-full bg-gradient-to-br from-[#000000] to-[#000000]"
                ></span
                >Vercel</span
              ><span
                class="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/70 py-1 pr-3 pl-1.5 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
                ><span
                  aria-hidden="true"
                  class="h-3.5 w-3.5 shrink-0 rounded-full bg-gradient-to-br from-[#1F1F1F] to-[#0E0E0E]"
                ></span
                >Supabase</span
              ><span class="text-xs font-medium text-zinc-500 dark:text-zinc-400"
                >+ 24 more</span
              >
            </div>
            <div class="mt-3 flex flex-wrap items-center gap-3">
              <a
                class="inline-flex items-center justify-center text-sm font-medium transition-colors focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900 dark:data-[state=open]:bg-zinc-800 bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 h-11 rounded-md px-8 gap-2 shadow-lg shadow-zinc-900/10 dark:shadow-black/40"
                href="/image"
                >Open full editor<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-arrow-right h-4 w-4"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path></svg></a
              ><span class="text-xs text-zinc-500 dark:text-zinc-400"
                >Free · no sign-in required</span
              >
            </div>
          </div>
          <div class="relative">
            <div
              class="pointer-events-none absolute inset-0 -m-4 rounded-3xl bg-gradient-to-br from-fuchsia-500/40 via-violet-500/30 to-sky-500/40 blur-2xl dark:from-fuchsia-500/30 dark:via-violet-500/20 dark:to-sky-500/30"
            ></div>
            <div
              class="transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none relative overflow-hidden rounded-xl border border-zinc-900/10 bg-white shadow-2xl ring-1 ring-black/5 dark:border-white/10 dark:bg-zinc-950"
              style="transform: perspective(1200px) rotateY(-6deg) rotateX(2deg)"
            >
              <img
                alt="Preview of a code image generated with Sharuco"
                width="2700"
                height="1440"
                decoding="async"
                data-nimg="1"
                class="h-auto w-full"
                srcset="
                  https://tailark.com/_next/image?url=%2Fmail2.png&w=3840&q=75&dpl=dpl_CK7ZTeahr3Qtk2yZ2rqpmuUBMmWT
                "
                src="https://tailark.com/_next/image?url=%2Fmail2.png&w=3840&q=75&dpl=dpl_CK7ZTeahr3Qtk2yZ2rqpmuUBMmWT"
                style="color: transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
</template>
