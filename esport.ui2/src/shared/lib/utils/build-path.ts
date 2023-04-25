export type Query = Record<string, string | number | undefined>;

export type Parameter = string | number;

function injectVariablesIntoUrl(
  url: string,
  parameters: (Parameter | Query)[] = []
) {
  let output = url;

  for (const variable of parameters) {
    output = output.replace(/:\w+/, encodeURIComponent(String(variable)));
  }

  return output.replace(/\/\//g, "/");
}

export function createBuildPath(prefix: string) {
  function buildPath<T extends (Parameter | Query)[] = []>(url: string) {
    return (parameters?: T) => injectVariablesIntoUrl(prefix + url, parameters);
  }

  return buildPath;
}

/* Example usage:

const buildPath = createBuildPath('/bank-files');

export const to = {
  Home: buildPath('/'),
  CollectionFiles: buildPath('/collection-files'),
  CollectionFileDetails: buildPath('/collection-files/:fileId'),
  CollectionFileDetailsByType: buildPath<[Parameter, Parameter]>('/collection-files/:fileId?type=:type'),
  DepositFiles: buildPath('/deposit-files'),
  DepositFileDetailsByType: buildPath<[Parameter, Parameter]>('/deposit-files/:fileId?type=:type'),
  DepositFileDetails: buildPath('/deposit-files/:fileId'),
  CreditFileDetailsByType: buildPath<[Parameter, Parameter]>('/credits/:fileId?type=:type'),
  CreditFileDetails: buildPath('/credits/:fileId'),
  Credits: buildPath('/credits'),
  MicroDeposits: buildPath('/micro-deposits'),
  MicroDepositsFileDetails: buildPath<[Parameter]>('/micro-deposits/:fileId'),
  GenerateFile: buildPath('/generate-file'),
};

 */
