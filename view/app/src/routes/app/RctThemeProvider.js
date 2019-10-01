/**
 * Rct Theme Provider
 */
import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { IntlProvider } from "react-intl";

// App locale
import AppLocale from "../lang";

// themes
import primaryTheme from "./themes/primaryTheme";

function RctThemeProvider(props) {
  const { children } = props;

  const currentAppLocale = AppLocale["en"];
  return (
    <MuiThemeProvider theme={primaryTheme}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <React.Fragment>{children}</React.Fragment>
      </IntlProvider>
    </MuiThemeProvider>
  );
}

export default RctThemeProvider;
