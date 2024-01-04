import { doc, getDoc, updateDoc } from "firebase/firestore";
import { IComment, ICompany } from "../../../../types/model";
import { db } from "../../../../../firebase";

const addComment = async (commentObject: IComment, companyId: string) => {
  const companyRef = doc(db, "companies", companyId);

  const newComments = [commentObject];

  //get old comments and add to newComments
  await getDoc(companyRef).then((doc) => {
    if (doc.exists()) {
      const companyData = doc.data() as ICompany;
      const comments = companyData?.comments;
      if (!comments) return;
      comments.forEach((comment) => {
        newComments.push(comment);
      });
    } else {
      console.log("No such document!");
    }
  });

  //add new comment to newComments
  await updateDoc(companyRef, {
    comments: newComments,
  });
};

export default addComment;
