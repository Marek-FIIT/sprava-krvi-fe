import { Component, Host, Prop, State, h } from '@stencil/core';

declare global {
  interface Window { navigation: any; }
}
@Component({
  tag: 'sprava-krvi-app',
  styleUrl: 'sprava-krvi-app.css',
  shadow: true,
})
export class SpravaKrviApp {
  @State() private relativePath = "";
  @Prop() basePath: string="";
  @Prop() apiBase: string;

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

    const toRelative = (path: string) => {
      if (path.startsWith( baseUri)) {
        this.relativePath = path.slice(baseUri.length)
      } else {
        this.relativePath = ""
      }
    }

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname)
  }
  render() {
    let element = "homepage"
    let entryId = "@new"
  
    if ( this.relativePath.startsWith("entry/"))
    {
      element = "editor";
      entryId = this.relativePath.split("/")[1]
    }

    if ( this.relativePath.startsWith("list"))
      {
        element = "list";
      }
    if ( this.relativePath.startsWith("unitlist"))
      {
        element = "unitlist";
      }
    if ( this.relativePath.startsWith("unitentry"))
      {
        element = "uniteditor";
        entryId = this.relativePath.split("/")[1]
      }
  
    const navigate = (path:string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute)
    }
  
    const renderElement = () => {
      switch (element) {
        case "homepage":
          return (
            <sprava-krvi-homepage
              ondonors-clicked={() => navigate("./list")}
              onunits-clicked={() => navigate("./unitlist")}
            ></sprava-krvi-homepage>
          );
        case "editor":
          return (
            <sprava-krvi-editor api-base={this.apiBase}
              entry-id={entryId}
              oneditor-closed={() => navigate("./list")}
            ></sprava-krvi-editor>
          );
        case "uniteditor":
            return (
              <sprava-krvi-uniteditor api-base={this.apiBase}
                entry-id={entryId}
                oneditor-closed={() => navigate("./unitlist")}
              ></sprava-krvi-uniteditor>
            );
        case "list":
          return (
            <sprava-krvi-list api-base={this.apiBase}
              onentry-clicked={(ev: CustomEvent<string>) => navigate("./entry/" + ev.detail)}
              oneditor-closed={() => navigate("./homepage")}
            ></sprava-krvi-list>
          );
        case "unitlist":
            return (
              <sprava-krvi-unitlist api-base={this.apiBase}
                onentry-clicked={(ev: CustomEvent<string>) => navigate("./unitentry/" + ev.detail)}
                oneditor-closed={() => navigate("./homepage")}
              ></sprava-krvi-unitlist>
            );
        default:
          return (
            <sprava-krvi-homepage
              ondonors-clicked={() => navigate("./list")}
              onunits-clicked={() => navigate("./unitlist")}
            ></sprava-krvi-homepage>
          );
      }
    };
    
    return <Host>{renderElement()}</Host>;
  }

}
