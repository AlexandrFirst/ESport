# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ["./StreamingService/StreamingService.csproj", "StreamingService/"]
COPY ["./ESportAuthClient/ESportAuthClient.csproj", "ESportAuthClient/"]
COPY ["./MediaClient/MediaClient.csproj", "MediaClient/"]
RUN dotnet restore StreamingService/StreamingService.csproj

COPY ./StreamingService/. ./StreamingService
COPY ./ESportAuthClient/. ./ESportAuthClient
COPY ./MediaClient/. ./MediaClient
RUN dotnet publish StreamingService/StreamingService.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0

EXPOSE 5004
EXPOSE 5014

WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "StreamingService.dll"]
