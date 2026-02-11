import React from "react";
import ReactDOM from "react-dom/client";
import { AccountSettings } from "./AccountSettings";
import { AppointmentConfirmed } from "./AppointmentConfirmed";
import { Appointments } from "./Appointments";
import { AppointmentsDetail } from "./AppointmentsDetail";
import { BlogNewsDetail } from "./BlogNewsDetail";
import { BlogNewsScreen } from "./BlogNewsScreen";
import { ChoosePackage } from "./ChoosePackage";
import { EmotionalHealth } from "./EmotionalHealth";
import { BlogNews } from "./BlogNews";
import { ClubWelcome } from "./ClubWelcome";
import EssentialDetails from "./EssentialDetails";
import { HealthTests } from "./HealthTests";
import { HelloMaria } from "./HelloMaria";
import { IntegrationLife } from "./IntegrationLife";
import { InDevelopment } from "./InDevelopment";
import { Login } from "./Login";
import { OnboardingFinish } from "./OnboardingFinish";
import { OrderSummary } from "./OrderSummary";
import { PastEvents } from "./PastEvents";
import { PaymentMethods } from "./PaymentMethods";
import { PlanSelect } from "./PlanSelect";
import { ProfileDetails } from "./ProfileDetails";
import { ProfileScreen } from "./ProfileScreen";
import { ProfessionalSignup } from "./ProfessionalSignup";
import { ProfessionalStatus } from "./ProfessionalStatus";
import { ProfessionalDashboard } from "./ProfessionalDashboard";
import { RoleSelect } from "./RoleSelect";
import { SupportMental } from "./SupportMental";
import { SupportNetwork } from "./SupportNetwork";
import { SupportNetworkScreen } from "./SupportNetworkScreen";
import { Subscription } from "./Subscription";
import { Splash } from "./index";
import { VideoLibrary } from "./VideoLibrary";
import { UpcomingEvents } from "./UpcomingEvents";
import { WelcomeAdvena } from "./WelcomeAdvena";
import "./tailwind.css";

const App = () => {
  const onboardingSteps = [
    "welcome",
    "support-mental",
    "club-welcome",
    "video-library",
    "onboarding-support-network",
    "onboarding-blog-news",
    "onboarding-health-tests",
    "onboarding-finish",
  ] as const;

  const [screen, setScreen] = React.useState<
    | "splash"
    | "create-account"
    | "professional-signup"
    | "professional-dashboard"
    | "professional-status"
    | "essential-details"
    | "login"
    | "plan-select"
    | "support-mental"
    | "club-welcome"
    | "onboarding-support-network"
    | "onboarding-blog-news"
    | "onboarding-health-tests"
    | "video-library"
    | "onboarding-finish"
    | "hello-maria"
    | "support-network"
    | "blog-news"
    | "blog-news-detail"
    | "emotional-health"
    | "integration-life"
    | "upcoming-events"
    | "past-events"
    | "profile"
    | "profile-details"
    | "appointments"
    | "appointments-detail"
    | "subscription"
    | "choose-package"
    | "order-summary"
    | "appointment-confirmed"
    | "account-settings"
    | "payment-methods"
    | "in-development"
    | "welcome"
  >("create-account");
  const handleStepChange = (index: number) => {
    const next = onboardingSteps[index];
    if (next) {
      setScreen(next);
    }
  };

  const handleTabSelect = (
    tab: "home" | "schedule" | "content" | "profile",
  ) => {
    if (tab === "home") {
      setScreen("hello-maria");
      return;
    }
    if (tab === "schedule") {
      setScreen("appointments");
      return;
    }
    if (tab === "content") {
      setScreen("blog-news");
      return;
    }
    setScreen("profile");
  };

  if (screen === "create-account") {
    return (
      <RoleSelect
        onPatient={() => setScreen("essential-details")}
        onProfessional={() => setScreen("professional-signup")}
        onLogin={() => setScreen("login")}
      />
    );
  }

  if (screen === "login") {
    return (
      <Login
        onBack={() => setScreen("create-account")}
        onSuccess={() => setScreen("plan-select")}
      />
    );
  }

  if (screen === "professional-signup") {
    return (
      <ProfessionalSignup
        onBack={() => setScreen("create-account")}
        onSuccess={() => setScreen("professional-status")}
      />
    );
  }

  if (screen === "professional-status") {
    return (
      <ProfessionalStatus
        onContinue={() => setScreen("professional-dashboard")}
      />
    );
  }

  if (screen === "professional-dashboard") {
    return (
      <ProfessionalDashboard
        onSelectTab={() => setScreen("professional-dashboard")}
        onNavigate={(next) => setScreen(next as typeof screen)}
      />
    );
  }

  if (screen === "plan-select") {
    return (
      <PlanSelect
        onBack={() => setScreen("create-account")}
        onSelect={() => setScreen("welcome")}
      />
    );
  }

  if (screen === "welcome") {
    return (
      <WelcomeAdvena
        onContinue={() => setScreen("support-mental")}
        onStepChange={handleStepChange}
        stepIndex={0}
      />
    );
  }

  if (screen === "support-mental") {
    return (
      <SupportMental
        onContinue={() => setScreen("club-welcome")}
        onStepChange={handleStepChange}
        stepIndex={1}
      />
    );
  }

  if (screen === "club-welcome") {
    return (
      <ClubWelcome
        onContinue={() => setScreen("video-library")}
        onStepChange={handleStepChange}
        stepIndex={2}
      />
    );
  }

  if (screen === "video-library") {
    return (
      <VideoLibrary
        onContinue={() => setScreen("onboarding-support-network")}
        onStepChange={handleStepChange}
        stepIndex={3}
      />
    );
  }

  if (screen === "onboarding-support-network") {
    return (
      <SupportNetwork
        onContinue={() => setScreen("onboarding-blog-news")}
        onStepChange={handleStepChange}
        stepIndex={4}
      />
    );
  }

  if (screen === "onboarding-blog-news") {
    return (
      <BlogNews
        onContinue={() => setScreen("onboarding-health-tests")}
        onStepChange={handleStepChange}
        stepIndex={5}
      />
    );
  }

  if (screen === "onboarding-health-tests") {
    return (
      <HealthTests
        onContinue={() => setScreen("onboarding-finish")}
        onStepChange={handleStepChange}
        stepIndex={6}
      />
    );
  }

  if (screen === "onboarding-finish") {
    return (
      <OnboardingFinish
        onContinue={() => setScreen("hello-maria")}
        onStepChange={handleStepChange}
        stepIndex={7}
      />
    );
  }

  if (screen === "hello-maria") {
    return (
      <HelloMaria
        onNavigate={(next) => {
          setScreen(next as typeof screen);
        }}
      />
    );
  }

  if (screen === "in-development") {
    return <InDevelopment onBack={() => setScreen("hello-maria")} />;
  }

  if (screen === "support-network") {
    return <SupportNetworkScreen onSelectTab={handleTabSelect} />;
  }

  if (screen === "profile") {
    return (
      <ProfileScreen
        onSelectTab={handleTabSelect}
        onNavigate={(next) => setScreen(next as typeof screen)}
      />
    );
  }

  if (screen === "profile-details") {
    return <ProfileDetails onSelectTab={handleTabSelect} />;
  }

  if (screen === "appointments") {
    return (
      <Appointments
        onSelectTab={handleTabSelect}
        onNavigate={(next) => setScreen(next as typeof screen)}
      />
    );
  }

  if (screen === "appointments-detail") {
    return (
      <AppointmentsDetail
        onSelectTab={handleTabSelect}
        onNavigate={(next) => setScreen(next as typeof screen)}
      />
    );
  }

  if (screen === "subscription") {
    return <Subscription onSelectTab={handleTabSelect} />;
  }

  if (screen === "blog-news") {
    return (
      <BlogNewsScreen
        onSelectTab={handleTabSelect}
        onNavigate={(next) => setScreen(next as typeof screen)}
      />
    );
  }

  if (screen === "blog-news-detail") {
    return (
      <BlogNewsDetail
        onSelectTab={handleTabSelect}
        onNavigate={(next) => setScreen(next as typeof screen)}
      />
    );
  }

  if (screen === "emotional-health") {
    return <EmotionalHealth onSelectTab={handleTabSelect} />;
  }

  if (screen === "integration-life") {
    return <IntegrationLife onSelectTab={handleTabSelect} />;
  }

  if (screen === "upcoming-events") {
    return (
      <UpcomingEvents
        onSelectTab={handleTabSelect}
        onNavigate={(next) => setScreen(next as typeof screen)}
      />
    );
  }

  if (screen === "past-events") {
    return (
      <PastEvents
        onSelectTab={handleTabSelect}
        onNavigate={(next) => setScreen(next as typeof screen)}
      />
    );
  }

  if (screen === "choose-package") {
    return (
      <ChoosePackage
        onSelectTab={handleTabSelect}
        onBooked={() => setScreen("appointments")}
        onNavigate={(next) => setScreen(next as typeof screen)}
      />
    );
  }

  if (screen === "order-summary") {
    return (
      <OrderSummary
        onSelectTab={handleTabSelect}
        onNavigate={(next) => setScreen(next as typeof screen)}
      />
    );
  }

  if (screen === "appointment-confirmed") {
    return (
      <AppointmentConfirmed
        onSelectTab={handleTabSelect}
        onNavigate={(next) => setScreen(next as typeof screen)}
      />
    );
  }

  if (screen === "account-settings") {
    return (
      <AccountSettings
        onSelectTab={handleTabSelect}
        onNavigate={(next) => setScreen(next as typeof screen)}
      />
    );
  }

  if (screen === "payment-methods") {
    return <PaymentMethods onSelectTab={handleTabSelect} />;
  }

  return (
    <EssentialDetails
      onBack={() => setScreen("login")}
      onSuccess={() => setScreen("plan-select")}
    />
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

