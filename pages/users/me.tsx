import Layout from "@components/Layout";
import useUser from "@libs/client/useUser";

const MyProfile = () => {
  const { user } = useUser({ routeType: "entered" });
  return (
    <Layout title="My Profile">
      <div></div>
    </Layout>
  );
};

export default MyProfile;
