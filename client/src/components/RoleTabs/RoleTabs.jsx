import React, { useState } from "react";
import { Container, Row, Col, Card, Nav, Button } from "react-bootstrap";
import RoleMaster from "../../components/RoleMaster/RoleMaster";
import RoleForm from "../../components/RoleForm/RoleForm";
import "./RoleTabs.css"; // custom gradient theme styles
import 'bootstrap/dist/css/bootstrap.min.css';

const RoleTabs = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [refresh, setRefresh] = useState(false);
  const [editingId, setEditingId] = useState(null); // store only ID

  // handle edit click from grid
  const handleEdit = (role) => {
    setEditingId(role.Role_ID);
    setActiveTab("createEdit");
  };

  // handle success (after add/edit)
  const handleSuccess = () => {
    setRefresh((prev) => !prev);
    setEditingId(null);
    setActiveTab("grid");
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col lg={10}>
          {/* 🔹 Tabs Navigation */}
          <Nav
            variant="tabs"
            className="gradient-tabs mb-4 rounded-pill justify-content-center"
          >
            <Nav.Item>
              <Nav.Link
                active={activeTab === "dashboard"}
                onClick={() => setActiveTab("dashboard")}
              >
                Role Dashboard
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                active={activeTab === "grid"}
                onClick={() => {
                  setEditingId(null);
                  setActiveTab("grid");
                }}
              >
                Role Master Grid
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                active={activeTab === "createEdit"}
                onClick={() => {
                  setEditingId(null);
                  setActiveTab("createEdit");
                }}
              >
                Create / Edit
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* 🔹 Tab Content */}
          <Card className="shadow-sm p-4 rounded-4 glass-card">
            {activeTab === "dashboard" && (
              <div className="text-center py-4">
                <h5 className="text-gradient mb-2">Role Dashboard</h5>
                <p className="text-muted">Dashboard content coming soon...</p>
              </div>
            )}

            {activeTab === "grid" && (
              <RoleMaster refresh={refresh} onEdit={handleEdit} />
            )}

            {activeTab === "createEdit" && (
              <RoleForm editingId={editingId} onSuccess={handleSuccess} />
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RoleTabs;
