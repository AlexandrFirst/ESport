# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ["./UserWorkflow.Api/UserWorkflow.Api.csproj", "UserWorkflow.Api/"]
COPY ["./UserWorkflow.Application/UserWorkflow.Application.csproj", "UserWorkflow.Application/"]
COPY ["./UserWorkflow.Esport/UserWorkflow.Esport.csproj", "UserWorkflow.Esport/"]
COPY ["./UserWorkflow.Images/UserWorkflow.Images.csproj", "UserWorkflow.Images/"]
COPY ["./UserWorkflow.Infrastructure/UserWorkflow.Infrastructure.csproj", "UserWorkflow.Infrastructure/"]
COPY ["./ESportAuthClient/ESportAuthClient.csproj", "ESportAuthClient/"]
COPY ["./RMQEsportClient/RMQEsportClient.csproj", "RMQEsportClient/"]
COPY ["./OcelotAuthClient/OcelotAuthClient.csproj", "OcelotAuthClient/"]


RUN dotnet restore UserWorkflow.Api/UserWorkflow.Api.csproj

COPY ./UserWorkflow.Api/. ./UserWorkflow.Api
COPY ./UserWorkflow.Application/. ./UserWorkflow.Application
COPY ./UserWorkflow.Esport/. ./UserWorkflow.Esport
COPY ./UserWorkflow.Images/. ./UserWorkflow.Images
COPY ./UserWorkflow.Infrastructure/. ./UserWorkflow.Infrastructure
COPY ./ESportAuthClient/. ./ESportAuthClient
COPY ./RMQEsportClient/. ./RMQEsportClient
COPY ./OcelotAuthClient/. ./OcelotAuthClient

RUN dotnet publish UserWorkflow.Api/UserWorkflow.Api.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "UserWorkflow.Api.dll"]
