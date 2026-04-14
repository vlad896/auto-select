type JsonLdSchema = Record<string, unknown>;

function withContext(schema: JsonLdSchema): JsonLdSchema {
  if ("@context" in schema) {
    return schema;
  }

  return {
    "@context": "https://schema.org",
    ...schema,
  };
}

export function JsonLdScripts({
  schemas,
  idPrefix = "jsonld",
}: {
  schemas: JsonLdSchema[];
  idPrefix?: string;
}) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`${idPrefix}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(withContext(schema)),
          }}
        />
      ))}
    </>
  );
}
