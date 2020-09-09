FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY CoronaShopBE/CoronaShopBE.csproj CoronaShopBE/
RUN dotnet restore CoronaShopBE/CoronaShopBE.csproj
COPY . .
WORKDIR /src/CoronaShopBE
RUN dotnet build CoronaShopBE.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish CoronaShopBE.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "CoronaShopBE.dll"]
