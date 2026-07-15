<script setup lang="ts"></script>

<template>
  <div class="container mx-auto space-y-4">
    <ProseH2 class="prose">Settings</ProseH2>

    <UCard variant="outline">
      <template #header>
        <h3 class="font-semibold mb-2 flex items-center gap-2">
          <Icon name="i-ph:user-fill" />

          You
        </h3>

        <p class="text-muted">
          All things and everything about you, including your profile.
        </p>
      </template>

      <div class="h-40 flex items-center justify-center gap-2 text-label-muted">
        <Icon name="i-ph:warning" />

        Not signed in
      </div>
    </UCard>

    <UCard variant="outline">
      <template #header>
        <h3 class="font-semibold mb-2 flex items-center gap-2">
          <Icon name="i-ph:swatches-fill" />

          Appearance
        </h3>

        <p class="text-muted">Customize how Quizbe looks and feel.</p>
      </template>

      <UFormField label="Color Mode:" orientation="horizontal">
        <UColorModeSelect />
      </UFormField>
    </UCard>

    <!-- <Card variant="outline" ui="{ header: 'space-y-4' }">
      {#snippet header()}
      <h3 class="font-semibold flex items-center gap-2">
        <Icon name="i-ph:key-fill" />
        Database
      </h3>

      <p class="text-label-muted">
        These secret keys are used for cloud syncing your resources. Keep the
        inputs empty if you want to store resources on your device.
      </p>

      <Alert
        icon="i-ph:warning"
        title="This does nothing at the moment"
        variant="soft"
      />
      {/snippet}

      <input bind:value="{secrets.key}" type="text" placeholder="API Key" />
      <input bind:value="{secrets.url}" type="text" placeholder="API URL" />
    </Card> -->
  </div>
</template>
