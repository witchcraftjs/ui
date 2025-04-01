{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv";
    devenv.inputs.nixpkgs.follows = "nixpkgs";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = { self, nixpkgs, devenv, systems, ... } @ inputs:
    let
      forEachSystem = nixpkgs.lib.genAttrs (import systems);
    in
    {
      packages = forEachSystem (system: {
        devenv-up = self.devShells.${system}.default.config.procfileScript;
      });

      devShells = forEachSystem
        (system:
          let
            pkgs = nixpkgs.legacyPackages.${system};
          in
          {
            default = devenv.lib.mkShell {
              inherit inputs pkgs;
              modules =
                [
                  {

                    # This is used by npx playwright --{ui,debug,...}
                    # https://discourse.nixos.org/t/running-playwright-tests/25655/33
                    env.PLAYWRIGHT_BROWSERS_PATH = "${pkgs.playwright-driver.browsers}";
                    env.PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = 1;
                    env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "true";
                    languages = {
                      javascript = {
                        enable = true;
                      package = pkgs.nodejs_23;
                        pnpm.enable = true;
                      };
                    };
                    enterShell = ''
                      export NPM_TOKEN=$(cat $SECRETS_DIR/NPM_TOKEN)
                      export GH_TOKEN=$(cat $SECRETS_DIR/GH_TOKEN)
                      echo "node `${pkgs.nodejs_23}/bin/node --version`"
                      echo "pnpm `${pkgs.nodePackages.pnpm}/bin/pnpm --version`"
                      echo PLAYWRIGHT_BROWSERS_PATH $PLAYWRIGHT_BROWSERS_PATH;
                      echo PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH $PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
                    '';
                  }
                ];
            };
          });
    };
}
