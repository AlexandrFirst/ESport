# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build-env
WORKDIR /app

COPY ["IdentityV2/IdentityV2.csproj", "IdentityV2/"]
COPY ["RMQEsportClient/RMQEsportClient.csproj", "RMQEsportClient/"]

RUN dotnet restore IdentityV2/IdentityV2.csproj

COPY IdentityV2/. ./IdentityV2
COPY RMQEsportClient/. ./RMQEsportClient
RUN dotnet publish IdentityV2/IdentityV2.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:3.1

EXPOSE 80
EXPOSE 443
EXPOSE 5000
EXPOSE 5001

WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "IdentityV2.dll"]
