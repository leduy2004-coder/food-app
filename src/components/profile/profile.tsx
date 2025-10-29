type Props = {
  nickName: string;
  email: string;
};

const ProfileInfo = ({ nickName, email }: Props) => {
  return (
    <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Thông tin</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <span className="mb-1 block text-sm text-gray-600">Họ và tên</span>
          <p className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-800">
            {nickName}
          </p>
        </div>
        <div>
          <span className="mb-1 block text-sm text-gray-600">Email</span>
          <p className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-800">
            {email}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
