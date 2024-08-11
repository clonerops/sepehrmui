import * as React from 'react';
import { SimpleTreeView  } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
// import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

type Props = {
    content: React.ReactNode
}

export default function FileSystemNavigator(props: Props) {
    const {content} = props
  return (
    <div style={{ minHeight: 180, flexGrow: 1}}>
      <SimpleTreeView 
        aria-label="file system navigator"
        // defaultCollapseIcon={<RemoveCircleOutline />}
        // defaultExpandIcon={<AddCircleOutline />}
      >
        <TreeItem itemId="1" label="مجوزها">
            {content}
        </TreeItem>
      </SimpleTreeView>
    </div>
  );
}