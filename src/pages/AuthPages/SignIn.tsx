import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
     <PageMeta
        title="FameOflame"
        description="This is FameOflame admin panel where admin can make CRUD operations to sub admins and incentives and Images gallery as well"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
};