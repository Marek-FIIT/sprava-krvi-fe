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
  @State() private queryParams = null;
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
      let url = new URL((ev as any).destination.url)
      toRelative(url.pathname);
    });

    toRelative(location.pathname)
  }
  render() {
    let element = "homepage"
    let entryId = "@new"
  
    if ( this.relativePath.startsWith("donor_entry/"))
    {
      element = "donoreditor";
      entryId = this.relativePath.split("/")[1]
    }

    if ( this.relativePath.startsWith("donors"))
      {
        element = "donors";
      }
    if ( this.relativePath.startsWith("units"))
      {
        element = "units";
      }
    if ( this.relativePath.startsWith("unit_entry"))
      {
        element = "uniteditor";
        entryId = this.relativePath.split("/")[1]
      }
  
    const navigate = (path:string) => {
      const url = new URL(path, new URL(this.basePath, document.baseURI))
      this.queryParams = url.searchParams
      // const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(url.pathname)
    }
  
    const renderElement = () => {
      switch (element) {
        case "homepage":
          return (
            <sprava-krvi-homepage
              ondonors-clicked={() => navigate("./donors")}
              onunits-clicked={() => navigate("./units")}
            ></sprava-krvi-homepage>
          );
        case "donoreditor":
          return (
            <sprava-krvi-editor api-base={this.apiBase}
              entry-id={entryId}
              oneditor-closed={() => navigate("./donoreditor")}
              onunit-editor-open={(ev: CustomEvent<string>) => navigate("./unit_entry/" + ev.detail)}
            ></sprava-krvi-editor>
          );
        case "uniteditor":
            return (
              <sprava-krvi-uniteditor api-base={this.apiBase}
                entry-id={entryId}
                donorData={this.queryParams}
                oneditor-closed={() => navigate("./units") }
              ></sprava-krvi-uniteditor>
            );
        case "donors":
          return (
            <sprava-krvi-list api-base={this.apiBase}
              onentry-clicked={(ev: CustomEvent<string>) => navigate("./donor_entry/" + ev.detail)}
              oneditor-closed={() => navigate("./homepage")}
            ></sprava-krvi-list>
          );
        case "units":
            return (
              <sprava-krvi-unitlist api-base={this.apiBase}
                onentry-clicked={(ev: CustomEvent<string>) => navigate("./unit_entry/" + ev.detail)}
                oneditor-closed={() => navigate("./homepage")}
              ></sprava-krvi-unitlist>
            );
        default:
          return (
            <sprava-krvi-homepage
              ondonors-clicked={() => navigate("./donors")}
              onunits-clicked={() => navigate("./units")}
            ></sprava-krvi-homepage>
          );
      }
    };
    
    return <Host>{renderElement()}</Host>;
  }
  

}
