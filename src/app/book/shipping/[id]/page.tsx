import { redirect } from "next/navigation";

export default async function MailInShippingRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/booking/${id}#tracking`);
}
