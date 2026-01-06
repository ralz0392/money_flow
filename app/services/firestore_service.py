import os


class FirestoreService:
    def __init__(self, project_id=None):
        try:
            from google.cloud import firestore
        except Exception:
            self.client = None
            return

        # initialize client if credentials are present
        creds = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
        if creds or project_id:
            try:
                self.client = firestore.Client(project=project_id)
            except Exception:
                self.client = None
        else:
            self.client = None

    def list_documents(self, collection_name):
        if not self.client:
            return []
        col = self.client.collection(collection_name)
        out = []
        for d in col.stream():
            data = d.to_dict()
            data['id'] = d.id
            out.append(data)
        return out

    def get_document(self, collection_name, doc_id):
        if not self.client:
            return None
        doc = self.client.collection(collection_name).document(doc_id).get()
        if doc.exists:
            data = doc.to_dict()
            data['id'] = doc.id
            return data
        return None

    def create_document(self, collection_name, data):
        if not self.client:
            return None
        ref = self.client.collection(collection_name).add(data)
        # ref is (DocumentReference, write_time)
        return ref[0].id if ref else None

    def update_document(self, collection_name, doc_id, data):
        if not self.client:
            return False
        self.client.collection(collection_name).document(doc_id).set(data, merge=True)
        return True

    def delete_document(self, collection_name, doc_id):
        if not self.client:
            return False
        self.client.collection(collection_name).document(doc_id).delete()
        return True
