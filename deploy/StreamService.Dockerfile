# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ["./StreamingService/StreamingService.csproj", "StreamingService/"]
COPY ["./ESportAuthClient/ESportAuthClient.csproj", "ESportAuthClient/"]
RUN dotnet restore StreamingService/StreamingService.csproj

COPY ./StreamingService/. ./StreamingService
COPY ./ESportAuthClient/. ./ESportAuthClient
RUN dotnet publish StreamingService/StreamingService.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:3.1

EXPOSE 5004
EXPOSE 5014

WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "StreamingService.dll"]
