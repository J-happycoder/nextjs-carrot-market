import Layout from "../../components/Layout";
import useUser from "../../libs/client/useUser";

const UpdateProfile = () => {
  const { user, mutateUser } = useUser({ routeType: "entered", redirectTo: "/enter" });
  return (
    <Layout title="Update Profile">
      <div></div>
    </Layout>
  );
};

export default UpdateProfile;
