type BackendError = {
  field: string;
  message: string;
};

export async function mockBackendValidation(
  values: Record<string, string>
): Promise<BackendError | null> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  if (values.bucket && values.bucket.includes("error")) {
    return {
      field: "bucket",
      message: "Backend validation failed: bucket name is not allowed",
    };
  }

  if (values.accessKey && values.accessKey.includes("b")) {
    return {
      field: "accessKey",
      message: "Backend validation failed: invalid access key",
    };
  }

  return null;
}
