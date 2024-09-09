import React from "react";
import DefaultCard from "../../molecules/DefaultCard";
import Button from "../../atoms/Button";
import Modal from "../../molecules/Modal";
import FormField from "../../molecules/FormField";
import FormCustomSelect from "../../molecules/FormCustomSelect";
import FormCheckbox from "../../molecules/FormCheckbox";
import { useAddressAccount } from "./useAddressAccount";

const AddressAccount: React.FC = () => {
  const {
    isEditMode,
    isModalOpen,
    formik,
    listAddress,
    listProvincies,
    listCities,
    openModal,
    closeModal,
    handleChangeCity,
    handleFormAddressForUpdate,
    handleDeleteAddress,
  } = useAddressAccount();

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title={isEditMode ? "Perbarui Alamat" : "Alamat Baru"}
        onClose={closeModal}
      >
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
          <FormField
            label="Nama Lengkap"
            unique="fullname"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            formikTouched={formik.touched.fullname}
            formikError={formik.errors.fullname}
          />
          <FormField
            label="Nomor Telepon"
            unique="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formik.values.phone}
            onChange={formik.handleChange}
            formikTouched={formik.touched.phone}
            formikError={formik.errors.phone}
          />
          <FormField
            label="Alamat"
            unique="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formik.values.address}
            onChange={formik.handleChange}
            formikTouched={formik.touched.address}
            formikError={formik.errors.address}
          />
          <FormCustomSelect
            label="Provinsi"
            name="province_id"
            options={listProvincies}
            value={formik.values.province_id}
            onChange={(selectedOption) => {
              formik.setFieldValue(
                "province_id",
                selectedOption ? selectedOption.value : ""
              );
              if (selectedOption) {
                handleChangeCity(selectedOption?.value);
              }
            }}
            error={formik.errors.province_id}
            isSearchable
          />
          <FormCustomSelect
            label="Kabupaten/Kota"
            name="city_id"
            options={listCities}
            value={formik.values.city_id}
            onChange={(selectedOption) => {
              formik.setFieldValue(
                "city_id",
                selectedOption ? selectedOption.value : ""
              );
            }}
            error={formik.errors.city_id}
            isSearchable
          />
          <FormField
            label="Detail Lainnya(contoh: Nomor rumah)"
            unique="other"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formik.values.other}
            onChange={formik.handleChange}
            formikTouched={formik.touched.other}
            formikError={formik.errors.other}
          />
          <FormCheckbox
            label="Atur Sebagai Alamat Utama"
            unique="main"
            className=""
            checked={formik.values.main}
            onChange={(e) => formik.setFieldValue("main", e.target.checked)}
            formikTouched={formik.touched.main}
            formikError={formik.errors.main}
          />

          <FormCustomSelect
            label="Tandai Sebagai"
            name="location"
            options={[
              { value: "home", label: "Home" },
              { value: "office", label: "Office" },
            ]}
            value={formik.values.location}
            onChange={(option) =>
              formik.setFieldValue("location", option?.value)
            }
            error={formik.errors.location}
          />

          <Button
            className="flex items-center gap-3 mt-6 rounded-md text-white py-3 w-full justify-center"
            type="submit"
            statusButton={formik.isSubmitting ? "disabled" : "primary"}
            isDisabled={formik.isSubmitting}
          >
            {formik.isSubmitting
              ? "Loading"
              : isEditMode
                ? "Perbarui "
                : "Simpan"}
          </Button>
          {isEditMode && (
            <Button
              className="flex items-center gap-3 mt-6 rounded-md text-white py-3 w-full justify-center"
              type="button"
              statusButton="danger"
              onClick={() => handleDeleteAddress()}
            >
              Hapus
            </Button>
          )}
        </form>
      </Modal>

      <section className="container mx-auto py-5 px-8 bg-white min-h-[50vh]">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {listAddress.length > 0 &&
            listAddress.map((list, addrexIndex) => (
              <DefaultCard
                key={addrexIndex}
                onClick={() => {
                  if (list?.id !== undefined) {
                    handleFormAddressForUpdate(list.id);
                  }
                }}
              >
                <article className="flex-grow text-left space-y-2">
                  <section className="flex gap-2">
                    <h6 className="capitalize">{list.fullname}</h6>
                    <span className=" font-normal">|</span>
                    <span className="font-normal hover:!text-white">
                      {list.phone}
                    </span>
                  </section>
                  <p className="text-sm font-normal">{`${list.address} ${list.other}`}</p>
                  <p className="text-sm font-normal">{`${list?.province?.name}, ${list?.city?.name} ,${list?.city?.postal_code}`}</p>
                </article>
                {list.main ? (
                  <p className="text-center mt-4 mb-3 bg-green-500 border border-white text-white py-1 rounded-lg w-4/12">
                    Utama
                  </p>
                ) : (
                  ""
                )}
              </DefaultCard>
            ))}
        </section>

        <section className="flex justify-center items-center w-full mt-8 lg:mt-12">
          <Button
            className="me-3 "
            statusButton="primary"
            type="button"
            onClick={openModal}
          >
            Tambah alamat baru
          </Button>
        </section>
      </section>
    </>
  );
};

export default AddressAccount;
