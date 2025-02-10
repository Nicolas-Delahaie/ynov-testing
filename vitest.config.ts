import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Permet d'utiliser `describe`, `it`, et `expect` sans les importer
    environment: "node", // Définit l'environnement pour les tests (ex. node, jsdom)
    include: ["tests/**/*.test.ts"], // Chemin des fichiers de tests
    coverage: {
      reporter: ["text", "html"], // Ajoute un rapport de couverture de code
    },
  },
});
