import React from "react";
import UserAccountPanel from "../components/UserAccountPanel";

export default function Profile() {
  return <UserAccountPanel fetchUrl="/api/me" />;
}
