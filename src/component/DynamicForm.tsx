import React, { useEffect, useState } from "react";
import {
  EMetadataComponent,
  EMetadataSelectMode,
  ITagCategory,
  IOption,
  IMetadataConfig,
} from "../interfaces/interfaces";
import { useForm } from "react-hook-form";
import styles from "./DynamicForm.module.scss";

interface DynamicTagFormProps {
  category: ITagCategory;
  mode: "create" | "edit";
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
  editIndex?: any;
}

const DynamicForm = ({
  category,
  mode,
  initialData = {},
  editIndex = null,
  onSubmit,
}: DynamicTagFormProps) => {
  const [queryOptions, setQueryOptions] = useState<Record<string, IOption[]>>(
    {}
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  const fetchQueryData = async (queryName: string) => {
    if (queryName === "players") {
      return new Promise<IOption[]>((resolve) =>
        setTimeout(
          () =>
            resolve([
              { label: "Player 1", value: "p1" },
              { label: "Player 2", value: "p2" },
            ]),
          500
        )
      );
    }
    return [];
  };

  useEffect(() => {
    const loadOptions = async () => {
      for (const field of category.metadataConfig) {
        if (
          field.component === EMetadataComponent.SELECT &&
          field.mode === EMetadataSelectMode.QUERY &&
          field.query
        ) {
          const options = await fetchQueryData(field.query);
          setQueryOptions((prev) => ({ ...prev, [field.key]: options }));
        }
      }

      Object.values(category.subCategories).forEach(async (sub) => {
        for (const field of sub.config) {
          if (
            field.component === EMetadataComponent.SELECT &&
            field.mode === EMetadataSelectMode.QUERY &&
            field.query
          ) {
            const options = await fetchQueryData(field.query);
            setQueryOptions((prev) => ({ ...prev, [field.key]: options }));
          }
        }
      });
    };

    loadOptions();
  }, [category]);

  const renderField = (field: IMetadataConfig) => {
    switch (field.component) {
      case EMetadataComponent.INPUT:
        return (
          <>
            <input
              type={field.type}
              readOnly={field.readOnly}
              className="border rounded p-2 w-full"
              {...register(field.key, {
                required: field.required ? `${field.label} is required` : false,
              })}
              name={field.key}
            />
            {errors[field.key] && (
              <p className="text-red-500 text-sm">
                {errors[field.key]?.message as string}
              </p>
            )}
          </>
        );

      case EMetadataComponent.SELECT:
        const options =
          field.mode === EMetadataSelectMode.OPTIONS
            ? field.options || []
            : queryOptions[field.key] || [];

        return (
          <>
            <select
              className="border rounded p-2 w-full"
              {...register(field.key, {
                required: field.required ? `${field.label} is required` : false,
              })}
            >
              <option value="">Select...</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors[field.key] && (
              <p className="text-red-500 text-sm">
                {errors[field.key]?.message as string}
              </p>
            )}
          </>
        );

      default:
        return null;
    }
  };
  const onSubmit1 = (data: any) => {
    const eventId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    let updatedData = {};
    if (editIndex !== null) {
      updatedData = { ...data, eventId };
    } else {
      updatedData = data;
    }

    onSubmit(updatedData);
    if (mode === "create") {
      reset();
    } else {
      reset({});
    }
  };
  useEffect(() => {
    if (editIndex !== null) {
      reset(initialData);
    } else {
      reset({});
    }
  }, [initialData, editIndex, reset]);
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit1)}>
      {category.metadataConfig.map((field) => (
        <div key={field.key} className={styles.field}>
          <label>{field.label}</label>
          {renderField(field)}
        </div>
      ))}

      {Object.entries(category.subCategories).map(([key, sub]) => (
        <div key={key} className={styles.subCategory}>
          <h4>{sub.label}</h4>
          {sub.config.map((field) => (
            <div key={field.key} className={styles.field}>
              <label>{field.label}</label>
              {renderField(field)}
            </div>
          ))}
        </div>
      ))}

      <button type="submit" className={styles.button}>
        {mode === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default DynamicForm;
