import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
     <PageMeta
        title="FameOflame"
        description="This is FameOflame admin panel where admin can make CRUD operations to sub admins and incentives and Images gallery as well"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
};