"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ConsentState = {
  necessary: true;
  functional: boolean;
};

type CookieConsentContextValue = {
  consent: ConsentState;
  hasResponded: boolean;
  setFunctionalConsent: (enabled: boolean) => void;
  acceptAll: () => void;
  declineOptional: () => void;
  savePreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
);

const CONSENT_COOKIE_NAME = "enigma-cookie-consent";
const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 days

const readConsentCookie = (): ConsentState | null => {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE_NAME}=`));

  if (!cookie) return null;

  try {
    const raw = decodeURIComponent(cookie.split("=")[1] ?? "");
    const parsed = JSON.parse(raw) as Partial<ConsentState>;

    if (typeof parsed?.functional !== "boolean") {
      return null;
    }

    return {
      necessary: true,
      functional: parsed.functional,
    };
  } catch (error) {
    console.warn("Failed to parse consent cookie:", error);
    return null;
  }
};

const writeConsentCookie = (consent: ConsentState) => {
  if (typeof document === "undefined") return;

  const payload = encodeURIComponent(JSON.stringify(consent));
  const secureFlag = typeof window !== "undefined" && window.location?.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${CONSENT_COOKIE_NAME}=${payload}; Path=/; Max-Age=${CONSENT_COOKIE_MAX_AGE}; SameSite=Lax${secureFlag}`;
};

export const CookieConsentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    functional: false,
  });
  const [hasResponded, setHasResponded] = useState(false);

  useEffect(() => {
    const stored = readConsentCookie();
    if (!stored) return;

    setConsent(stored);
    setHasResponded(true);
  }, []);

  useEffect(() => {
    if (!hasResponded) return;

    writeConsentCookie(consent);
  }, [consent, hasResponded]);

  const setFunctionalConsent = useCallback((enabled: boolean) => {
    setConsent((prev) => ({
      ...prev,
      functional: enabled,
    }));
  }, []);

  const acceptAll = useCallback(() => {
    setConsent({
      necessary: true,
      functional: true,
    });
    setHasResponded(true);
  }, []);

  const declineOptional = useCallback(() => {
    setConsent({
      necessary: true,
      functional: false,
    });
    setHasResponded(true);
  }, []);

  const savePreferences = useCallback(() => {
    setHasResponded(true);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      hasResponded,
      setFunctionalConsent,
      acceptAll,
      declineOptional,
      savePreferences,
    }),
    [consent, hasResponded, setFunctionalConsent, acceptAll, declineOptional, savePreferences]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }

  return context;
};

