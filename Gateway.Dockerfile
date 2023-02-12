# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ["GateWay/GateWay.csproj", "GateWay/"]
COPY ["ESportAuthClient/ESportAuthClient.csproj", "ESportAuthClient/"]
RUN dotnet restore GateWay/GateWay.csproj

COPY GateWay/. ./GateWay
COPY ESportAuthClient/. ./ESportAuthClient
RUN dotnet publish GateWay/GateWay.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "GateWay.dll"]
