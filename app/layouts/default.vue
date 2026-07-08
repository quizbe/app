<script lang="ts"></script>

<template>
  <Head>
    <Title>Quizbe - Interactive learning in one space</Title>
  </Head>

  <nav class="sticky flex items-center w-full p-4 gap-2">
    <NuxtLink to="/" class="h-fit font-black text-2xl text-primary-500">
      Quizbe
    </NuxtLink>

    <span class="grow"></span>

    <UColorModeButton />

    <UButton
      href="/account"
      label="Account"
      variant="soft"
      color="neutral"
      icon="i-lucide:user"
    />
  </nav>

  <slot />
</template>
