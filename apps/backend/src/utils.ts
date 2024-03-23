// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { parseArgs } from "util";
import type { OurApp } from ".";

export function handleSwaggerGen(app: OurApp) {
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      swagger: {
        type: "boolean",
      },
      file: {
        type: "string",
      },
    },
    allowPositionals: true,
  });
  if (values.file === undefined) {
    console.error("🦊 Usage: bun swagger --file <filename.json>");
    process.exit(1);
  }
  if (values.swagger) {
    console.log("🦊 Generating Swagger JSON");
    app
      .handle(new Request("http://localhost:3000/swagger/json"))
      .then((res) => res.text())
      .then((s) => Bun.write(values.file ?? "", s))
      .then(() => {
        console.log("🦊 Swagger JSON generated");
        process.exit(0);
      })
      .catch((e) => {
        console.error("🦊 Error generating Swagger JSON", e);
        process.exit(1);
      });
  }
}
